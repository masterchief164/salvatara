
const mongoose = require("mongoose")

const notificationsettingsSchema = new mongoose.Schema({
    itemSold:{
        type:Boolean,
        default:false
    },
    bidActivity:{
        type:Boolean,
        default:false
    },
    priceChange:{
        type:Boolean,
        default:false
    },
    auctionExpiration:{
        type:Boolean,
        default:false
    },
    outBid:{
        type:Boolean,
        default:false
    },
    successfullPurchase:{
        type:Boolean,
        default:false
    },
    omniseaNewsLetter:{
        type:Boolean,
        default:false
    }

},
    {timestamps:true}
)
notificationsettingsSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret.__v
        delete ret.id
    }
  })
module.exports = mongoose.model("notificationsetting",notificationsettingsSchema,"notificationsetting")
