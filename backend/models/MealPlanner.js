const mongoose=require('mongoose')
const Schema=mongoose.Schema()
const mealplannerSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
 date:{
    type:Date,
    required:true
 },
 time:{
    type:string,
    required:true
 },
 meal:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Meals'
 }
})
module.exports=mongoose.model('MealsPlan',mealplannerSchema)