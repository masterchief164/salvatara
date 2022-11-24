const Collection = require("../models/collectionModel")
const NFT = require("../models/nftModel")
const catchAsync = require('../utils/catchAsync')
const APIFeatures = require("../utils/apiFeatures")

//create Collection
exports.createCollection = catchAsync(async(req, res) => {
    let found = await Collection.findOne({title:req.body.title})
    if(found) {
        let created = await Collection.create(req.body)
        if(created) {
            res.send({status:true, message:"Collection created", data: created})
        } else {
            res.send({status:false, message:"Collection not created"})
        }
    } else {
        res.send({status:false,message:"collection name already taken"})
    }
})

//nft created
exports.createNFT = catchAsync(async(req, res) => {
    let found = await NFT.findOne({title:req.body.title})
    if(found) {
        let created = await NFT.create(req.body)
        if(created) {
            res.send({status:true, message:"NFT created", data: created})
        } else {
            res.send({status:false, message:"NFT not created"})
        }
    } else {
        res.send({status:false, message:"nft name already taken"}) 
    }
})

//get all nfts
exports.getAllNFT = catchAsync(async(req,res,next) =>{
    let nft
    let search = req.query.search
    if(search) {
        let QStringTitle = searchQuery(search,"title")
        let QStringDesccription = searchQuery(search,"description")
        nft = await NFT.find({$or:QStringTitle.concat(QStringDesccription)})
        return res.status(200).json({
            status:true,
            results:nft.length,
            message:"all nft",
            data:nft
        })
    }
    
    let doc
    if(req.query.status!=="") {
      doc = await NFT.find({status:req.query.status})
    } else {
        doc = await NFT.find({})
    }

    if(doc.length>0) {
        res.status(200).json({
            status:true,
            results:doc.length,
            message:"all NFT",
            users:doc
        })
    } else {
        res.send({status:false, message:"No NFT", data:[]})
    }
})