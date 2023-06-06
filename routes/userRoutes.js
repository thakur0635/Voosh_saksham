const express = require('express')
const { loginController, registerController, authcontroller } = require('../controllers/userCtrl')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/register', registerController)

router.post('/login', loginController)

router.post('/getUserData',auth , authcontroller)


module.exports = router