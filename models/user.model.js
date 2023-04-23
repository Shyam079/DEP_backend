const mongoose = require('mongoose');

const User = mongoose.model('User',
mongoose.Schema({
    // username:String,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    profilePic:String,
    roles:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Role"
        }
    ]
    
},{strict:false}
));

module.exports = User;