
const mongoose = require("mongoose")

const bidSchema = new mongoose.Schema({
    nft:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'nft'
    },
    collectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'collection'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
    {timestamps:true}
)

bidSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret.id
    }
})

module.exports = mongoose.model("bid",bidSchema,"bid")
