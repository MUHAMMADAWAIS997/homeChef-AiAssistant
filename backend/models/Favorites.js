
const mongoose=require('mongoose')
const Schema=mongoose.Schema()
const mealplannerSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
 name:{
    type:String,
    required:true
 },
 meal:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Meals'
 }
})
module.exports=mongoose.model('WishList',mealplannerSchema)