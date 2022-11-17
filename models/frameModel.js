const mongoose = require("mongoose");

const galleryFramesSchema = new mongoose.Schema({
    gallery:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gallery'
    },
   position:[{x:String,y:String,z:String}],
   args:[{x:String,y:String,z:String}],
   borderFrame:[{x:String,y:String,z:String}],
   dominatedAxis:{
    type:String
   },
   boundary:[{x:String,y:String}],
   borderFill:{
    type:String,
    enum:['color','image','gradient']
   },
   borderColor:{
    type:String
   },
   borderImageURL:{
    type:String
   },
   borderGradient:{
    type:String
   }
},
    {timestamps:true}
);


module.exports = mongoose.model("GalleryFrame",galleryFramesSchema,"GalleryFrame");

// args = [1.1,1.15,1.15]
// dominatedaxis = x or z
// units = [0.15,0.01]