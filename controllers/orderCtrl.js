const orderModel = require("../models/order")



const addOrdercontroller = async(req , res ) => {
    try{
        const newOrder = orderModel(req.body)
        await newOrder.save()
        res.status(201).send({
            success : true,
            message : "Order added successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in adding order"
        })
    }
}


const getOrdercontroller = async(req , res ) => {
    try{
        const orders = await orderModel.find({userId : req.body.userId});
        res.status(200).send({
            success : true,
            message : "Orders fetched successfully",
            data : orders
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success : false,
            message : "Error in fetching orders"
        })
    }
}


module.exports = {addOrdercontroller , getOrdercontroller}