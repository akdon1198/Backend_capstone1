const router = require("express").Router()
const JobdesModal = require("../modal/JobdesModal")
const jwt = require("jsonwebtoken")
const islogin = (req, res, next) =>{
    try{
        const {token} = req.headers
        jwt.verify(token, process.env.JWT_KEY)
        next()
    }catch(err){
        res.json({
            message : "token expired"
        })
    }
}

router.post("/jobdesc", async (req, res) =>{
    try{
        await JobdesModal.create(req.body)
        res.json({
            message : "job details saved"
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

router.patch("/jobdesc/:id", async (req, res) => {
    try{
        const {id} = req.params
        await JobdesModal.findByIdAndUpdate(id, req.body)
        res.json({
            message : "user updated successfuly"
        })
    }catch(err){
        res.json({
            message : "something went wrong"
        })
    }
})

router.get("/jobdesc", async (req, res) => {
    try{
        const jobs = await JobdesModal.find({skills : {$in : req.body.skills}, jobpos : req.body.jobtitle})
        res.json({
            jobs
        })
    }catch{
        res.json({
            message : "something went wrong"
        })
    }
})

module.exports = router