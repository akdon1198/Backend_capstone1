const router = require("express").Router()
const Usermodal = require("../modal/UserModal")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()

router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body
        console.log("hello1");
        const user = await Usermodal.findOne({email : email})
        if(hasmatch){
            const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_KEY, {expiresIn:60})
            res.json({
                message : "user login successfuly",
                jwttoken
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
        const exitinguser = await Usermodal.findOne({email : req.body.email})
        if(exitinguser){
            res.status(409).json({error : "Email already present"})
        }
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = new Usermodal(req.body)
        await user.save()
        // const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_KEY, {expiresIn: 10})
        res.json({
            message:"User registered successfuly",
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

module.exports = router