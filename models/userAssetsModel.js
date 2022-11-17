const mongoose = require("mongoose");

const userAssetSchema = new mongoose.Schema({
    assetName:{
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },                                                                  
    gallery:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery'
    },
    frame:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GalleryFrame'
    },
    description:{
        type:String
    },
    media_original_url:{
        type:String
    },
    contract_address:{
        type:String
    },
    contractName:{
        type:String
    },
    blockchain:{
        type:String
    },
    mime_type:{
        type:String
    },
    token_address:{
        type:String
    }
},
    {timestamps:true}
);


module.exports = mongoose.model("userAsset",userAssetSchema,"userAsset");