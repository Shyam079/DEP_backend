
const db = require('../models');
const AdminRequests = db.AdminRequests;
const User = db.user;



isconfirmedAccess = (req, res, next) => {
    

}


const adminControls = {
    isconfirmedAccess,
    verifyToken
};
module.exports = adminControls;