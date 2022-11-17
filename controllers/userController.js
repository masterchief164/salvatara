
const User = require("../models/userModel");
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require("../utils/apiFeatures");
const referralCodeGenerator = require('referral-code-generator')
const {searchQuery} = require("../utils/helper");

const Booking = require("../models/bookingModel");


exports.userOnboarding = catchAsync(async(req,res,next) =>{
    const user = req.user;

    res.status(200).json({
        status:true,
        message:"User onboarded.",
        user:user
    })
});


exports.login = catchAsync(async(req,res,next) =>{
    const user = req.user;
    res.status(200).json({
        status:true,
        message:"User details",
        user:user,
    })
})


//update user
exports.updateUser = catchAsync(async(req,res,next) =>{
    const user = req.user;
    const userId = req.params.userId;

    if(user.userType==="admin" || JSON.stringify(user._id)===JSON.stringify(userId)){
        let updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true});
        return res.status(200).json({
            status:true,
            message:"User updated",
            user:updatedUser
        })
    }else{
        return next(new AppError("You don't have permission to edit user",400))
    }
})


//get a user
exports.getAUser = catchAsync(async(req,res,next) =>{
    const userId = req.params.userId;

    let user = await User.findById(userId);
    return res.status(200).json({
        status:true,
        message:"get user details",
        user:user
    })

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
