
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        default:"Unknown"
    },
    phone:{
        type:String,
        default:"+910000000000"
    },
    email:{
        type:String,
        default:"testuser@gmail.com"
    },
    userType:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    walletId:{
        type:String
    },
    firebaseUid:{
        type:String,
        required:true,
        unique:true
    },
    firebaseSignInProvider:{
        type:String,
        required:true
    },
    active:{      // for user block functionality. if (active=false) then user is blocked.
        type:Boolean,
        default:true
    },
    isDeleted:{  // to soft delete user. if(isDeleted = true), then user is deleted.
        type:Boolean,
        default:false
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("User",userSchema,"User");
