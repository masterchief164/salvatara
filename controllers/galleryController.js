const User = require("../models/userModel")
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require("../utils/apiFeatures")
const {searchQuery} = require("../utils/helper")
const galleryModel = require('../models/galleryModel')

// get Gallery List
exports.getAllgallery = catchAsync(async(req,res,next) =>{
    let gallery = await galleryModel.find({})
    if(gallery.length>0){
        res.send({status: true, message: 'Gallery List', data:gallery})
    } else {
        res.send({status:false, message: 'No Gallery', data: []})
    }
})