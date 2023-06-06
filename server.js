const express  = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')



dotenv.config()


connectDB()



const app = express()


//static
app.use(express.static(path.join(__dirname,'./client/build')))

app.get("*",function(req,res){
    res.sendFile(path.join(__dirname , "./client/build/index.html"))
})


//middlewares
app.use(express.json())
app.use(morgan('dev'))


//routes
app.use('/api/v1/user' , require('./routes/userRoutes'))
app.use('/api/v1/order' , require('./routes/orderRoutes'))


const port = process.env.PORT || 5000

app.listen(port , ()=>{
    console.log(`Server ruuning on port ${port}`)
})

