
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
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("collection",collectionSchema,"collection")
