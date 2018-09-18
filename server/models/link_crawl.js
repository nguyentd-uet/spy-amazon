var mongoose = require('mongoose');

var LinkCrawlSchema = new mongoose.Schema({
    crawl_link: {
        type: String,
        required: true
    },
    keyword: String,
    type: {
        type: String,
        enum: ['top', 'newest']
    },
    status: {
        type: Boolean,
        default: true
    },
    num_page_to_crawl: {
        type: Number,
        default: 20
    },
    user_id: String,
    created_date: {
        type: Date,
        default: new Date()
    }
}, {
    collection: 'linkCrawl'
});

// const link = 'https://www.amazon.com/s/ref=amb_link_483004722_1?ie=UTF8&hidden-keywords=ORCA&field-keywords=school&bbn=12035955011&field-enc-merchantbin=ATVPDKIKX0DER&rh=i%3Afashion-novelty'


module.exports = mongoose.model('LinkCrawl', LinkCrawlSchema);