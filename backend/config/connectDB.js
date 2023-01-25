const mongoose=require('mongoose');

const connectDB=()=>{
    const URI=`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:${process.env.MONGO_PORT}/?authSource=admin`;
    mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongo:${process.env.MONGO_PORT}/?authSource=admin`,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log(`DB connected on PORT ${process.env.MONGO_PORT}`))
    .catch(err => console.log(err))
}
module.exports=connectDB;

