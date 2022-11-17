const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    galleryName:{
        type:String
    },
    total_frames: {
        type: Number
    },
    url:{
        type:String
    },
    description:{
        type:String
    },
    frames:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GalleryFrame'
    }

},
    {timestamps:true}
);


module.exports = mongoose.model("Gallery",gallerySchema,"Gallery");