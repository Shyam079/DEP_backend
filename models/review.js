const mongoose = require('mongoose');

const Review = mongoose.model('Review',
mongoose.Schema({
    // username:String,
    description:String,
    rating: Number,
    service:String,
    file:String,
},{timestamps:true}));

module.exports = Review;