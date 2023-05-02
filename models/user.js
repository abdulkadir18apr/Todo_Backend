const mongoose =require('mongoose')
const {Schema}=mongoose;

const userScema=new Schema({
    Name:String,
    Email:String,
    Password:String
})
module.exports=mongoose.model('user',userScema);


