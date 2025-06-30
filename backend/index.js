const connectDb=require('./db')
connectDb()
const express=require('express')
const cors =require('cors')
const PORT=3000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/mealplan',require('./routes/mealplanner'))
app.use('/api/meal',require('./routes/meals'))
app.use('/api/ingredient',require('./routes/ingredients'))
app.use('/api/shoplist',require('./routes/shoplist'))
app.use('/api/wishlist',require('./routes/favorite'))
app.use('/api/assistant',require('./routes/chat'))


app.listen(PORT,()=>{
    console.log(`server is running on: http://localhost:${PORT}`)
})