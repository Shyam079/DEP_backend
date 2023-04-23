const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


checkDuplicateUsernameOrEmail = (req, res, next) => {  
      // Email
      User.findOne({
        email: req.body.email
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (user) {
          res.status(400).send({ message: "Failed! Email is already in use!" });
          return;
        }  
        next();
      });
};

checkRolesExisted= (req, res, next) => {
    if(req.body.roles){
        if(req.body.roles!=="admin" && req.body.roles!=='moderator' && req.body.roles!=='user'){
            res.status(400).send({
              message:`Failed! ${req.body.roles} does not exist`
            });
            return;
        }    
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};
module.exports = verifySignUp;