
const mongoose = require("mongoose")

const nftSchema = new mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    externalLink:{
        type:String
    },
    explicit_sensitive:{
        type:Boolean
    },
    stats:{
        type:Boolean
    },
    royalty:{
        type:Number
    },
    imageURL:{
       type:String
    },
    market:{
        type:String,
        enum:["setPrice","highestBid"]
    },
    collectionId:{
        type: mongoose.Schema.Types.ObjectId
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("nft",nftSchema,"nft")
