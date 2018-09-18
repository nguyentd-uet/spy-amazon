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
    status: Boolean,
    num_page_to_crawl: {
        type: Number,
        default: 20
    }
}, {
    collection: 'linkCrawl'
});

module.exports = mongoose.model('LinkCrawl', LinkCrawlSchema);