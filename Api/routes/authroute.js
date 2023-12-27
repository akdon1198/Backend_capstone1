const router = require("express").Router()
const Usermodal = require("../modal/UserModal")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()

router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await Usermodal.findOne({email})
        const hasmatch = await bcrypt.compare(password, user.password)
        if(hasmatch){
            const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_KEY, {expiresIn:180})
            res.json({
                message : "user login successfuly",
                jwttoken : jwttoken
            })
        }else{
            res.json({
                message : "wrong credential"
            })
        }
    }catch(err){
        res.json({
            message : "oops something went wrong"
        })
    }
})

router.post("/register", async (req, res)=>{
    try{
        const {name, email, mobile, password} = req.body
        const hashedpassword = await bcrypt.hash(password, 10)
        const user = new Usermodal({name, email, mobile, password : hashedpassword})
        await user.save()
        const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_KEY, {expiresIn: 10})
        res.json({
            message:"User registered successfuly",
            jwttoken : jwttoken
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

module.exports = router