const mongoose = require('mongoose');

const User = mongoose.model('User',
mongoose.Schema({
    // username:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profilePic:String,
    roles:String
    
},{strict:false}
));

module.exports = User;