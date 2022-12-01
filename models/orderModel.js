
const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    nft:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'nft'
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    walletAddressFrom:{
        type:String,
        default:""
    },
    walletAddressTo:{
        type:String,
        default:"",
    },
    transactionType:{
        type:String,
        enum:["Transfer", "Bid","Sale", "List", "Minted"]
    },
    hash:{
        type:String
    },
    tokenId:{
        type:String
    },
    // transactionType:{
    //     type:String
    // },
    currentDate:{
        type: Date,
        default: Date.now()
    }
},
    {timestamps:true}
)

orderSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret.id
    }
})

module.exports = mongoose.model("order",orderSchema,"order")
