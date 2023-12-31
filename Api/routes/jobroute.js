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
    let skillsarray = req.body.skillsrequired.split(",").map(skill => skill.trim())
    req.body.skillsrequired = skillsarray
    try{
        const newjob = new JobdesModal(req.body)
        await newjob.save()
        res.json({
            message : "job details saved"            
        })
    }catch(err){
        res.json({
            message : "something wrong happend"
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
            message : "something happend"
        })
    }
})

router.get("/jobdesc", async (req, res) => {
    const {jobtitle, skills} = req.query
    let query = {}
    if(jobtitle) query = {jobpos : jobtitle}
    if(skills) query.skillsrequired = {$in : skills.split("&")}
    try{
        const jobs = await JobdesModal.find(query)
        res.json({
            jobs
        })
    }catch{
        res.json({
            message : "something went wrong"
        })
    }
})

router.get("/jobdesc/:id", async (req, res) => {
    const {id} = req.params
    try{
        const job = await JobdesModal.findById(id)
        res.json({
            job
        })
    }catch{
        res.json({
            message : "something went wrong"
        })
    }
})

module.exports = router