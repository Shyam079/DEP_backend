const mongoose = require('mongoose');

const AdminRequest = mongoose.model(
    'AdminRequest',
    new mongoose.Schema({
        user:String,
        description:String,
        _id:mongoose.Schema.Types.ObjectId,
    },{timeStamps:true})
)
module.exports = AdminRequest;