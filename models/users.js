const mongoose=require('mongoose')
const schema=mongoose.schema

const userSchema=new schema(
    {
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },password:{
            type:String,
            required:true
        },email:{
            type:String,
            required:true
        },roles: {
            user: {
                type: Number,
                default: 2001
            },
            Editor: Number,
            Admin: Number
    },
    
    refreshToken: String,
    image: String 
    }
)
module.exports=mongoose.model('users',userSchema)
