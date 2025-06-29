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

app.listen(PORT,()=>{
    console.log(`server is running on: http://localhost:${PORT}`)
})