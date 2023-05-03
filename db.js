const mongoose = require('mongoose');
const mongooseURI = process.env.MONGO_DB_CONNECTION;
mongoose.set('strictQuery', false);

const connectToMongo = async () => {
    const conn=await mongoose.connect(mongooseURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log("connected")).catch((err)=>console.log(err))
}

mongoose.connection
    .once("open", () => console.log("Connected"))
    .on('error', error => console.log("error", error))
module.exports = connectToMongo


