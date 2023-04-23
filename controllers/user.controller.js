// const db= require('../models');
// const AdminReq = db.AdminRequests;
// const User = db.user;
// const config = require('../config');
const db = require("../models");
const User = db.user;
const Review = db.review;
const News = db.news;
var bcrypt = require("bcryptjs");

exports.allAccess =  (req,res)=>{
    res.status(200).send('Public Content');
}

exports.userBoard = (req,res)=>{
    res.status(200).send('User content')
}

exports.adminBoard = (req,res) =>{
    res.status(200).send('Admin content')
}

exports.moderatorBoard = (req,res) =>{
    res.status(200).send('Moderator content');
}
exports.updateUser = async(req,res)=>{
  try {

      //const { id } = req.params;
      // console.log('id: ' + id);
      const { fname,lname , email, password ,profilePic} = req.body;
      const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        const id = user._id;

      // console.log("Request parameters:", id);
      // console.log("Request body:", req.body);
  
      // Construct the update object based on defined fields in the request body
      const updateObj = {};
      if (fname) updateObj.firstName = fname;
      if (lname) updateObj.lastName = lname;
      if (email) updateObj.email = email;
      if (password) updateObj.password = bcrypt.hashSync(password, 8);
      if (profilePic) updateObj.profilePic = profilePic;
     
      const updatedUser = await User.findByIdAndUpdate(id, updateObj, {
        new: false, // Return the updated document instead of the old one
        runValidators: true, // Validate the updated data against the model schema
        
      });
     console.log("Updated user:", updatedUser);
  
      if (!updatedUser) {
        console.log("User not found");
        return res.status(404).json({ message: 'User not found' });
      }
      
      // res.status(200).json({ message: 'you made it' });
      // Return the updated user as the response
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      
      res.status(500).json({ message: 'Internal server error' });
    }
}

exports.tableData = (req,res) =>{
    const headers = ['Name', 'Email', 'Address','Country'];
    const body= ['Hemanth','a@b.com','Kaikauru','India'];
    res.status(200).send({headers,body});
}

exports.reviewUser = async (req,res) => {
  console.log(req.body);
  var reviewData = new Review({
    service: req.body.service,
    rating: req.body.rating,
    description: req.body.description,
    file: req.body.file
  });
  reviewData.save().then(()=>{
      console.log('Saved review');
      res.status(200).json({message:"Saved review successfully"});
  }).catch(err =>{
      res.status(403).send("Found error in saving"+err);
      console.log('Error in saving\n' + err);
  })
}

exports.getNews = async (req, res) => {
  try{
    const postMessages = await News.find();
    res.status(200).json(postMessages);
  }
  catch(err){
      console.log(err);
      res.status(404).json({message:err.message})
  }
}