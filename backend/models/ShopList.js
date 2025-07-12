const mongoose=require('mongoose')
const {Schema}=mongoose
const shopListSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String,
    },
    title:{
        type: String,
        unique:true,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required: true
    },
    ingredient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ingredient'
    }
})
module.exports=mongoose.model('Shoplist',shopListSchema)