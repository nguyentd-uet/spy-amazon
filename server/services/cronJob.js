const CronJob = require('cron').CronJob;
const {crawlData} = require('../services/crawler');
const LinkCrawl = require('../models/link_crawl');

function crawlJob() {
    var job = new CronJob({
        cronTime: '00 47 00 * * *',
        onTick: function() {
          /*
           * Runs every day at 11:30:00 AM.
           */
            LinkCrawl.find({status: true},async function(err, links) {
                if(links && links.length > 0) {
                    for (let i = 0; i < links.length; i++) {
                        if(links[i].crawl_link && links[i].num_page_to_crawl) {
                            await crawlData(links[i].crawl_link, links[i].num_page_to_crawl);
                        }
                    }
                }
            })
        },
        start: true,
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    job.start();
}

export { crawlJob }