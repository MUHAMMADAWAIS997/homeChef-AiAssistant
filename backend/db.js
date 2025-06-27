const mongoose = require('mongoose')
const connectDb=async ()=>{
    try{

    await mongoose.connect('mongodb://localhost:27017/home-chef');
    console.log('MongoDB Connected successfully')
    }catch(err){
        console.log('Mongo Connection error',err)
    }
}
module.exports=connectDb