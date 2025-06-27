const mongoose=require('mongoose')
const Schema=mongoose.Schema()
const shopListSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type: String,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    }
})
module.exports=mongoose.model('shoplist',shopListSchema)