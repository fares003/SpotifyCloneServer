const mongoose=require('mongoose')
const schema=mongoose.schema

const albumsSchema =new schema({
    num_of_tracks:{
        type:Number,
        required:true,
        default:0
    },
    images:{
        type:[string],
        required:true
    },
    name:{
        type:String,
        required:true
    },
    release_date:{
        type:Date,
        required:true
    },
    artists:{
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'User', 
        required: true,
    },
    tracks:{
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'track', 
        required:true
    }

})
module.exports=mongoose.model('albums',albumsSchema)
