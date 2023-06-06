const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId:{
        type : String,
    },
    phone :{
        type : Number,
        required : true
    },
    subTotal : {
        type : String,
    },
    
})

const orderModel = mongoose.model("orders",orderSchema)

module.exports = orderModel