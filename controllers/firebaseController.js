const admin = require("firebase-admin")
const serviceAccount = require("../salvatara-private-key.json")
const AppError = require('../utils/appError')
const User = require("../models/userModel")
const md5 = require("md5")
// const Notification = require("../models/notificationModel")
const { getAuth, signInWithCustomToken } = require("firebase/auth")
require("../utils/firebaseweb")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const requiresAuth = async (req,res,next) =>{
    const idToken = req.header("Authorization")
    if(!idToken){
        return next(new AppError('Please pass firebase auth token ',400));
    }
    const bearer = idToken.split(' ')
    const token = bearer[1]

    let decodedIdToken;
    try{
        decodedIdToken = await admin.auth().verifyIdToken(token,true)
    }catch(error){
        next(error)
        return
    }
    let user = await User.findOne({firebaseUid:decodedIdToken.uid});
    if(!user){
        if(req.baseUrl + req.path==="/user/onboarding"){
            if(decodedIdToken.firebase.sign_in_provider === "phone"){
                user = await User.create({
                    phone:decodedIdToken.phone_number,
                    firebaseUid:decodedIdToken.uid,
                    firebaseSignInProvider:decodedIdToken.firebase.sign_in_provider,
                    email:req.body.email,
                    userType:req.body.userType,
                    password:md5(req.body.password),
                })
            }else{
                user = await User.create({
                    email:decodedIdToken.email,
                    firebaseUid:decodedIdToken.uid,
                    firebaseSignInProvider:decodedIdToken.firebase.sign_in_provider,
                    userType:req.body.userType,
                    password:md5(req.body.password),
                    loginType:req.body.loginType
                })
            }
        }else{
            return next(new AppError("User not found",404));
        }
        
    } 
    req.user = user;
    next();
}

const restrictTo = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.userType)){
            return next(new AppError('You do not have permission ot perform this action',403));
        }
        next();
    }
};

//Only for backend developer to generate token to call APIS
const generateToken = async(req,res,next) => {
    try{
        const token =  await admin.auth().createCustomToken(req.params.uid);
        const user = await signInWithCustomToken(getAuth(),token);
        const idToken = user._tokenResponse.idToken

        return res.status(200).json({
            status: true,
            token: idToken
        });

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:false,
            msg:err.message
        })
    }
}

const sendNotification = async(topic,reciever,title,message,image,notificationType,notificationTypeId) => {
    const messaging = admin.messaging()
    var payload = {
        notification: {
            title,
            body: message,
            image:image
        },
        topic: topic
    };

    messaging.send(payload)
    .then((result) => {
        console.log(result)
    })
    await Notification.create({
        reciever:reciever,
        title:title,
        body:message,
        image:image,
        notificationType:notificationType, // booking a bike, admin create
        notificationTypeId:notificationTypeId,
    })
}

module.exports = {
    requiresAuth,
    restrictTo,
    generateToken,
    sendNotification
}
