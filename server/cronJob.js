const {crawlData} = require('./services/crawler');
const LinkCrawl = require('./models/link_crawl');

async function crawlJob() {
    console.log('start crawl')
    LinkCrawl.find({status: true},async function(err, links) {
        if(links && links.length > 0) {
            for (let i = 0; i < links.length; i++) {
                console.log(links[i])
                if(links[i].crawl_link && links[i].num_page_to_crawl && links[i].type) {
                    if (links[i].type === 'newest') {
                        links[i].crawl_link += '&sort=date-desc-rank'
                    }
                    await crawlData(links[i].crawl_link, links[i].num_page_to_crawl);
                }
            }
        }
    })
}

crawlJob();