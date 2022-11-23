const Collection = require("../models/collectionModel")
const NFT = require("../models/nftModel")
const catchAsync = require('../utils/catchAsync')

//create Collection
exports.createCollection = catchAsync(async(req, res) => {
    let created = await Collection.create(req.body)
    if(created) {
        res.send({status:true, message:"Collection created", data: created})
    } else {
        res.send({status:false, message:"Collection not created"})
    }
})

//nft created
exports.createNFT = catchAsync(async(req, res) => {
    let created = await NFT.create(req.body)
    if(created) {
        res.send({status:true, message:"NFT created", data: created})
    } else {
        res.send({status:false, message:"NFT not created"})
    }
})

//get all nfts
exports.getAllNFT = catchAsync(async(req,res,next) =>{
    let nft
    let search = req.query.search
    if(search){
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
    nft = new APIFeatures(NFT.find(),req.query).filter()
    const doc = await NFT.query

    res.status(200).json({
        status:true,
        results:doc.length,
        message:"all NFT",
        users:doc
    })
})