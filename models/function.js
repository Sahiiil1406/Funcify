const mongoose=require('mongoose')
const functionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    uuid:{
        type:String,
        required:true
    },
    environment:{
        type:String,
        required:true,
        enum:['node:alpine','python']
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{ timestamps:true})

module.exports=mongoose.model('Function',functionSchema)