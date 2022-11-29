
const mongoose = require("mongoose")

const customerSupportSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    queryType:{
        type:String,
    },
    message:{
        type:String,
    },
    attachment:{
        type:String,
    }
},
    {timestamps:true}
)
customerSupportSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret.id
    }
  })
module.exports = mongoose.model("customersupport",customerSupportSchema,"customersupport")
