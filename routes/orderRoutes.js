const express = require('express')
const { addOrdercontroller ,  getOrdercontroller} = require('../controllers/orderCtrl')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/add-order', auth, addOrdercontroller)

router.post('/get-order' , auth , getOrdercontroller)


module.exports = router