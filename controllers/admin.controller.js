const db = require("../models");
const User = db.user;
const Role = db.role;

exports.confirmAccess = (req,res) =>{
    User.findOne({
            username: req.body.username
          })
            .populate("roles", "-__v")
            .exec((err, user) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
        
              if (!user) {
                return res.status(404).send({ message: "User Not found." });
              }
        Role.find(
            {
                name: {$in: req.body.roles}
            },
            (err,roles) => {
                if (err) {
                    return res.status(500).send({ message: err });
                  }
                  if (!roles.find((role) => role.name === req.body.targetRole)) {
                    roles.push(new Role({ name: req.body.targetRole }));
          
                    user.roles = roles.map((role) => role._id);
                    user.save((err) => {
                      if (err) {
                        return res.status(500).send({ message: err });
                      }
          
                      res.send({ message: "Admin access granted!" });
                    });
                  } else {
                    res.send({ message: "User already has admin access!" });
                  }
            }
        )
              
    });
}

exports.declineAccess = (req, res) => {
    User.findOne({
        username: req.body.username
      })
        .populate("AdminRequest", "-__v")
        .exec((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
    
          if (!user) {
            return res.status(404).send({ message: "User Not found." });
          }
    Role.find(
        {
            name: {$in: req.body.roles}
        },
        (err,roles) => {
            if (err) {
                return res.status(500).send({ message: err });
              }
              if (roles.find((role) => role.name === req.body.targetRole)) {
                roles.pop(new Role({ name: req.body.targetRole }));
      
                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                  if (err) {
                    return res.status(500).send({ message: err });
                  }
      
                  res.send({ message: "Admin access removed!" });
                });
              } else {
                res.send({ message: "User does not have admin access!" });
              }
        }
    )
          
});
}
