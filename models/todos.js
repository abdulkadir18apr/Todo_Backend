const mongoose=require('mongoose');
const {Schema} =mongoose;

const todoSchema=new Schema({
    id:Number,
    task:String,
    date:Date,
    tag:String,
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
    }
})

module.exports=mongoose.model('ToDODb',todoSchema)



