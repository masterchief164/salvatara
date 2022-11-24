
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
    status:{
        type:String,
        enum:["OnSale","Sold","Hidden","InActive","OfferReceived"]
    },
    collectionId:{
        type: mongoose.Schema.Types.ObjectId
    }
},
    {timestamps:true}
)
nftSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret.id
    }
})
module.exports = mongoose.model("nft",nftSchema,"nft")
