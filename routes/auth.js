const express=require('express');
const {default:mongoose} =require('mongoose');
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router=express.Router();
const User=require("../models/user");



const JWT_SECRET=process.env.JWT_KEY;


router.post("/signup",[
    body("Name","Enter A Valid Name greater Than 3 Character").isLength({min:3}),
    body("Email","enter Email Only").isEmail(),
],async(req,res)=>{

    const error=validationResult(req)
    success=false;
    if(!error.isEmpty){
        return res.status(400).json({success,error:error.array()});
    }
    try{
        let user=await User.findOne({Email:req.body.email})
        if(user){
            return res.status(400).json({success,masg:"Email is Registered"});
        }
        const salt=await bcrypt.genSaltSync(10);
        const secpass=await bcrypt.hashSync(req.body.password,salt);
    
         user=await User.create({
            Name:req.body.name,
            Email:req.body.email,
            Password:secpass
         })
    
         await user.save();
         const data={
            user:{
                id:user.id
            }
         }
    
         const authToken=await jwt.sign(data,JWT_SECRET);
         success=true;
         res.json({success,authToken});

    }
    catch(err){
        console.log(err);
        res.status(400).json({success,err})
    }
  
  
})

//Login

router.post("/login",async(req,res)=>{

    let success=false;
    const errors=validationResult(req);
    if(!errors.isEmpty){
        res.status(400).json({success,errors:errors})
    }
    try{
        let user=await User.findOne({Email:req.body.email});
        if(!user){
            
            return res.status(400).json({success,error:"try login with correct credential"});
        }
        const passwordCompare=await bcrypt.compare(req.body.password,user.Password);

        if(!passwordCompare){
            return res.status(400).json({success,error:"try login with correct credential"});
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
    }
    catch(err){
        console.log(err)
        res.status(400).json({success,error:err})
    }


})


module.exports = router;