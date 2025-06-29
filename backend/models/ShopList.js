const mongoose=require('mongoose')
const {Schema}=mongoose
const shopListSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type: String,
        unique:true,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    }
})
module.exports=mongoose.model('Shoplist',shopListSchema)