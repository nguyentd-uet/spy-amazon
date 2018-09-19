var mongoose = require('mongoose');

var LinkCrawlSchema = new mongoose.Schema({
    crawl_link: {
        type: String,
        required: true
    },
    keyword: String,
    type: {
        type: String,
        default: 'top',
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

module.exports = mongoose.model('LinkCrawl', LinkCrawlSchema);