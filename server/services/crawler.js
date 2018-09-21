const puppeteer = require('puppeteer');
const url = require('url');
const Product = require('../models/product');

async function crawlData(link, num_page_to_crawl) {
    try {
        // mở trình duyệt
        const browser = await puppeteer.launch();
        // Mở 1 page mới
        const page = await browser.newPage();
        let link_products = [];
        for(let i = 1; i <= num_page_to_crawl; i++) {
            await page.goto(`${link}&page=${i}`, {timeout: 0});
            const link_products_in_page = await page.evaluate(() => {
                // scroll page
                window.scrollBy(0, Math.floor((Math.random() * 1000) + 1));
                const cards = document.querySelectorAll("div.a-gesture");
                if (cards.length === 0) {
                    return [];
                } 
                let links = [];
                cards.forEach(item => {
                    let thumbnail = item.querySelector('img.s-access-image').src
                    links.push({
                        link: item.querySelector('a').href,
                        thumbnail: thumbnail.replace('AC_UL260_SR200,260', 'AC_UL560_SR500,560')
                    })
                });
            
                return links
            });

            if (link_products_in_page.length === 0) {
                i = num_page_to_crawl;
            } else {
                link_products.push(...link_products_in_page)
            }
        }
        
        // lay keyword tu link
        const keyword = url.parse(link, true).query['field-keywords'] || '';
        
        // chứa danh sách những promise
        const promises = [];
        for (let i = 0; i < link_products.length; i++) {
            promises.push(await getProductInfo(link_products[i].link, page, keyword, link_products[i].thumbnail))
        }

        // tắt trình duyệt
        await browser.close();
    } catch (error) {
        console.log(error)
        return;
    }
} 

async function getProductInfo(product_link, page, keyword, thumbnail) {
    try {
        //delay
        await timeout(Math.floor((Math.random() * 10000) + 1));

        await page.goto(product_link, {timeout: 0});
        // Chờ 2s sau khi page được load để tránh overload
        await page.waitFor(2000);

        let product = await page.evaluate(() => {
            // scroll page
            window.scrollBy(0, Math.floor((Math.random() * 1000) + 1));
            const brand = document.querySelector('#bylineInfo') ? document.querySelector('#bylineInfo').innerText : '';
            const title = document.querySelector('#productTitle') ? document.querySelector('#productTitle').innerText : '';

            let asin = ''
            if(document.querySelector('#ASIN')) {
                asin =  document.querySelector('#ASIN').value;
            } else {
                return;
            }
            const price = document.querySelector('#priceblock_ourprice') ? document.querySelector('#priceblock_ourprice').innerText : '';

            const featureBullets = document.querySelector('#feature-bullets') ? document.querySelector('#feature-bullets').querySelectorAll("li") : [];
            let bullets = [];
            featureBullets.length > 0 && featureBullets.forEach(item => {
                const ignoreBullets = ['solid', 'imported', 'machine', 'lightweight,'];
                const firstWordOfItem = item.innerText && item.innerText.split(' ')[0].toLowerCase();
                if(ignoreBullets.indexOf(firstWordOfItem) === -1 && item.innerText) {
                    bullets.push(item.innerText);
                } 
            })
            const bullet1 = bullets[0] || '';
            const bullet2 = bullets[1] || '';

            let first_time_on_amazon;
            const detailBullets = document.querySelector('#detailBullets_feature_div') ? document.querySelector('#detailBullets_feature_div').querySelectorAll('li') : [];
            detailBullets.length > 0 && detailBullets.forEach(item => {
                if (item.innerText && item.innerText.indexOf('Date first listed on Amazon') !== -1) {
                    first_time_on_amazon = item.innerText.split(':')[1].trim();
                }
            })

            const salesRank = document.querySelector('#SalesRank');
            let rankNumber = -1;
            if (salesRank) {
                const rankText = salesRank.innerText ? salesRank.innerText.split('#')[1].split(' ')[0] : -1;
                rankNumber = parseInt(rankText.replace(/\D/g,''));
            }

            const currentTime = new Date().getTime();
            const data = {
                asin: asin,
                brand: brand,
                title: title,
                price: price,
                newest_rank: rankNumber,
                bullet1: bullet1,
                bullet2: bullet2,
                first_time_on_amazon: first_time_on_amazon,
                last_crawl_time: currentTime
            }
            return data;
        });

        product.product_link = product_link;
        product.thumbnail = thumbnail;
        product.keyword = keyword;

        addToDatabase(product);
        return page;
    } catch (error) {
        console.log(error)
        return;
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// kiem tra 2 thoi diem co cung 1 ngay ko
function isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

function addToDatabase(product) {
    try {
        // console.log(product);

        Product.findOne({asin: product.asin}, function(err, data) {
            if(err) {
                console.log(err);
                return;
            }

            // neu da ton tai product, cap nhat product 
            if (data) {
                data.price = product.price;
                data.brand = product.brand;
                data.title = product.title;
                data.newest_rank = product.newest_rank;
                
                // so sanh ngay cuoi cung update rank history voi lan crawl nay
                // neu cung ngay, cap nhat vao phan tu cuoi cua array
                // neu ko cung ngay, push vao cuoi array
                const parseDate_lastCrawlTime = new Date(product.last_crawl_time);
                const lastElement_rankHistory = data.rank_history[data.rank_history.length - 1];
                const keyOfLastElement = Object.keys(lastElement_rankHistory)[0];
                const lastDayCrawl_rankHistory = new Date(keyOfLastElement);
                if (isSameDay(parseDate_lastCrawlTime, lastDayCrawl_rankHistory)) {
                    data.rank_history[data.rank_history.length - 1] = {
                        [product.last_crawl_time]: product.newest_rank
                    }
                } else {
                    data.rank_history.push({
                        [product.last_crawl_time]: product.newest_rank
                    });
                }

                // ty le tang hoac giam rank
                const lastRankObj = data.rank_history[data.rank_history.length - 2]
                const lastRank = Object.values(lastRankObj)[0]
                const pct_change = (product.newest_rank - lastRank)*100/lastRank
                data.pct_change = parseFloat(pct_change).toFixed(1)
                
                if (data.keywords.indexOf(product.keyword) === -1) {
                    data.keywords.push(product.keyword);
                }
                data.last_crawl_time = product.last_crawl_time;

                data.save(function (err, updatedData) {
                    if (err) console.log(err);
                    return;
                });
            } else {
                // tao moi product
                product.rank_history = [{
                    [product.last_crawl_time]: product.newest_rank
                }];
                product.keywords = [];
                if (product.keyword && product.keyword !== '') {
                    product.keywords.push(product.keyword);
                }
                product.keyword = undefined;

                const newProduct = new Product(product);
                newProduct.save(function (err, newData) {
                    if (err) console.log(err);
                    return;
                });
            }
        })
    } catch (error) {
        console.log(error)
        return;
    }
}

module.exports = {crawlData}