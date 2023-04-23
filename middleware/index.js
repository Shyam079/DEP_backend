const authJwt = require('../middleware/authJwt');
const verifySignUp = require('../middleware/verifySignUp');
const adminControls= require('../middleware/adminControls');

module.exports = {
    authJwt,
    verifySignUp,
    adminControls,
}
