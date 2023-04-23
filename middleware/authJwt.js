const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
// const refreshConfig = require('../config/refresh.config');
const db = require('../models');
const Role = db.role;
const User = db.user;

verifyToken =(req,res,next) =>{
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message:"No token provided"
        });
    }
    jwt.verify(token,config.secret,(error,decoded)=>{
        if(error){
            return res.status(401).send({
                message:"Unauthorized access"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

refreshToken = (req,res,next) =>{
    let token = req.headers['x-refresh-token'];

    if(!token){
        return res.status(403).send({
            message:"No refresh token provided"
        });
    }

    jwt.verify(token,refreshConfig.secret,(error,decoded)=>{
        if(error){
            return res.status(401).send({
                message:"Invalid Refresh Token provided"
            });
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req,res,next) =>{
    User.findById(req.userId).exec( (err,user) =>{

        if(err){
        res.status(500).send({message:err});
        return;
        }

        Role.find(
            {
                _id:{$in:user.roles}   
            },
            (err,roles) =>{
                if(err){
                    res.status(500).send({message:err.message});
                    return;
                }
                for(let i=0;i<roles.length;i++){
                    if(roles[i].name ==='admin'){
                        next();
                        return;
                    }
                }
        
                res.status(403).send({message:"Require admin role"});
                return;
                }
            )
    }) 
}

isModerator = (req,res,next) =>{
    User.findById(req.userId)
    .exec( (err,user) =>{
        if(err){
        res.status(500).send({message:err});
        return;
        }
    Role.find(
    {
        _id:{$in:user.roles}   
    },
    (err,roles) =>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        
        for(let i=0;i<roles.length;i++){
            if(roles[i].name ==='moderator'){
                next();
                return;
            }
        }

        res.status(403).send({message:"Require moderator role"});
        return;
        }
      );
    });
}

const authJwt = {
    verifyToken,
    refreshToken,
    isAdmin,
    isModerator,
}

module.exports = authJwt;