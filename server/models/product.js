var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    asin: {
        type: String,
        required: true,
        unique: true
    },
    title: String,
    price: String,
    product_link: String,
    newest_rank: Number,
    rank_history: {},
    first_time_on_amazon: Date,
    bullet1: String,
    bullet2: String,
    thumbnail: String,
    keywords: [],
    created_time: Date,
    last_crawl_time: Date
}, {
    collection: 'product'
});

module.exports = mongoose.model('Product', ProductSchema);