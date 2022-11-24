
const User = require("../models/userModel")
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require("../utils/apiFeatures")
const {searchQuery} = require("../utils/helper")
const md5 = require('md5')
const SendMail = require("../utils/mail")

//user onboarding
exports.userOnboarding = catchAsync(async(req,res,next) =>{
    const user = req.user
    res.status(200).json({
        status:true,
        message:"User onboarded.",
        user:user
    })
})

// user login
exports.login = catchAsync(async(req,res,next) =>{
    const user = req.user
    console.log(req.user.password, md5(req.body.password))
    if (req.user.password === md5(req.body.password) && req.body.email === req.body.email) {
        res.status(200).json({
            status:true,
            message:"Success fully Logged In",
            user:user,
        })
      } else {
        res.send({status:false, message:"passord or email wrong"})
      }
})


//update user
exports.updateUserPassword = catchAsync(async(req,res,next) =>{
    const user = req.user
    const userId = req.params.userId
    let data = {
        password:md5(req.body.password)
    }
        let updatedUser = await User.findOneAndUpdate({_id:userId},data,{new:true})
        return res.status(200).json({
            status:true,
            message:"User updated",
            user:updatedUser
        })
})

// send otp to mail
exports.sendOtp = catchAsync(async(req,res,next) =>{
    const user = req.user
    const otp = Math.floor(10000 + Math.random() * 90000)
    SendMail.sendMail(req.user.email,'Regarding reset password in Salvatara app', 'OTP for Reset Password ' + otp) 
    res.send({status:true, message:'otp successfully sent to mail'})
})


//get all users
exports.getAllUsers = catchAsync(async(req,res,next) =>{
    let users;
    let search = req.query.search;
    if(search){
        let QStringName = searchQuery(search,"name");
        let QStringEmail = searchQuery(search,"email");
        users = await User.find({$or:QStringName.concat(QStringEmail)});
        return res.status(200).json({
            status:true,
            results:users.length,
            message:"all users",
            users
        })
    }
    users = new APIFeatures(User.find(),req.query).filter();
    const doc = await users.query;

    res.status(200).json({
        status:true,
        results:doc.length,
        message:"all users",
        users:doc
    })
})
