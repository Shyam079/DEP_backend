const mongoose = require('mongoose');

const News = mongoose.model('News',
mongoose.Schema({
    // username:String,
    postedBy:String,
    post:String,
    likes:Number,
    comments: [{
        text: String,
        postedBy: String
    }],
    shares:Number

},{timestamps:true}));

module.exports=News;