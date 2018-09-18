const puppeteer = require('puppeteer');
const url = require('url');
const Product = require('../models/product');

const link = 'https://www.amazon.com/s/ref=amb_link_483004722_1?ie=UTF8&hidden-keywords=ORCA&field-keywords=school&bbn=12035955011&field-enc-merchantbin=ATVPDKIKX0DER&rh=i%3Afashion-novelty&page='
const num_page_to_crawl = 20;

async function crawlData() {
    // mở trình duyệt
    const browser = await puppeteer.launch({ headless: false });
    // Mở 1 page mới
    const page = await browser.newPage();
    let link_products = [];
    for(let i = 1; i <= num_page_to_crawl; i++) {
        await page.goto(link + i, {timeout: 0});
        const link_products_in_page = await page.evaluate(() => {
            // scroll page
            window.scrollBy(0, Math.floor((Math.random() * 1000) + 1));
            const cards = document.querySelectorAll("div.a-gesture");
            if (cards.length === 0) {
                return [];
            } 
            let links = [];
            cards.forEach(item => {
                links.push({
                    link: item.querySelector('a').href,
                    thumbnail: item.querySelector('img.s-access-image').src
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
    
    // console.log(link_products);
    const keyword = url.parse(link, true).query['field-keywords'] || '';
    
    // chứa danh sách những promise
    const promises = [];
    for (let i = 0; i < link_products.length; i++) {
        promises.push(await getProductInfo(link_products[i].link, page, keyword, link_products[i].thumbnail))
    }

    // tắt trình duyệt
    await browser.close();
} 

async function getProductInfo(product_link, page, keyword, thumbnail) {
    //delay
    await timeout(Math.floor((Math.random() * 10000) + 1));

    await page.goto(product_link, {timeout: 0});
    // Chờ 2s sau khi page được load để tránh overload
    await page.waitFor(2000);

    let product = await page.evaluate(() => {
        // scroll page
        window.scrollBy(0, Math.floor((Math.random() * 1000) + 1));
        const title = document.querySelector('#productTitle').innerText;
        const asin = document.querySelector('#ASIN').value;
        const price = document.querySelector('#priceblock_ourprice').innerText;

        const featureBullets = document.querySelector('#feature-bullets').querySelectorAll("li");
        let bullets = [];
        featureBullets.length > 0 && featureBullets.forEach(item => {
            const ignoreBullets = ['solid', 'imported', 'machine', 'lightweight,'];
            const firstWordOfItem = item.innerText.split(' ')[0].toLowerCase();
            if(ignoreBullets.indexOf(firstWordOfItem) === -1) {
                bullets.push(item.innerText);
            } 
        })
        const bullet1 = bullets[0] || '';
        const bullet2 = bullets[1] || '';

        let first_time_on_amazon;
        const detailBullets = document.querySelector('#detailBullets_feature_div').querySelectorAll('li');
        detailBullets.length > 0 && detailBullets.forEach(item => {
            if (item.innerText.indexOf('Date first listed on Amazon') !== -1) {
                first_time_on_amazon = item.innerText.split(':')[1].trim();
            }
        })

        const salesRank = document.querySelector('#SalesRank');
        let rankNumber = -1;
        if (salesRank) {
            const rankText = salesRank.innerText.split('#')[1].split(' ')[0];
            rankNumber = parseInt(rankText.replace(/\D/g,''));
        }

        const currentTime = new Date().getTime();
        const data = {
            asin: asin,
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
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addToDatabase(product) {
    try {
        console.log(product);

        Product.findOne({asin: product.asin}, function(err, data) {
            if(err) {
                console.log(err);
                return;
            }
            if (data) {
                data.price = product.price;
                data.title = product.title;
                data.newest_rank = product.newest_rank;
                
                data.rank_history.push({
                    [last_crawl_time]: product.newest_rank
                });
                if (data.keywords.indexOf(product.keyword) === -1) {
                    data.keywords.push(product.keyword);
                }
                data.last_crawl_time = product.last_crawl_time;

                data.save(function (err, updatedData) {
                    if (err) console.log(err);
                    return;
                });
            } else {
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

export {crawlData}