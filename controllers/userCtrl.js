const userModel = require("../models/user")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



// Controller to register a user

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ phone: req.body.phone })
        if (existingUser) {
            return res.status(200).send({ success: false, message: "User already exists" })
        }
        const password = req.body.password
        
        const salt = await bcrypt.genSalt(10)
        
        const hashedPassword = await bcrypt.hash(password, salt)
        
        req.body.password = hashedPassword
        
        const newUser = new userModel(req.body)
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(201).send({
            success: true,
            message: "Registered successfully" , 
            token
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Can't register user"  })
    }

}

// Controller to login a user

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ phone: req.body.phone })

        if (!user)
            return res.status(200).send({ success: false, message: "User doesn't exists" })

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch)
            return res.status(200).send({ success: false, message: "Invalid phone or password" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).send({ success: true, message: "Login Success", token })
    }
    catch (error) {
        console.log('hvcjhvcmzv')
        res.status(500).send({ success: false, message: error.message })
    }

}



// Controller to check if  user is authorised

const authcontroller = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Auth failed"
            })
        }
        user.password = undefined
        res.status(200).send({
            success: true,
            data: user

        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "auth error",
            error
        })
    }
}





module.exports = { loginController, registerController, authcontroller }