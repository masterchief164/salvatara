
const mongoose = require("mongoose")

const collectionSchema = new mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    description:{
        type:String
    },
    externalLink:{
        type:String
    },
    explicit_sensitive:{
        type:Boolean
    },
    royalty:{
        type:Number
    },
    profile:{
       type:String
    },
    cover:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},
    {timestamps:true}
)

collectionSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret.id
    }
})

module.exports = mongoose.model("collection",collectionSchema,"collection")
