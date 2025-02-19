const mongoose=require('mongoose')
const schema=mongoose.schema

const categoriesSchema =new schema({

    name:{
        type:String,
        required:true
    },
    icon:{
        type:[String],

    }

})
module.exports=mongoose.model('category',categoriesSchema)
