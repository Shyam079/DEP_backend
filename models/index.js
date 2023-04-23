const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db ={};
db.mongoose = mongoose;
db.user = require('./user.model');
db.role = require('./role.model');
db.news= require('./news.model');
db.review = require('./review');
db.ROLES = ["user", "admin","moderator"];
// db.AdminRequests= require('./adminRequest.model');
// db.ADMIN_REQUESTS=['makeAdmin','makeModerator'];
module.exports = db;