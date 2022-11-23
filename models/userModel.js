
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String
    },
    userType:{
        type:String,
        enum:["user","admin","partner"],
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
    active:{
        type:Boolean,
        default:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    loginType:{
        type:String
    }
},
    {timestamps:true}
)

module.exports = mongoose.model("User",userSchema,"User");
