const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const app = express()
const jobRoute = require("./routes/jobroute")
const authRoute = require("./routes/authroute")
dotenv.config()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("database connected");})
.catch(()=>{console.log("database not connected");})

app.get("/health", (req, res)=>{
    res.json({
        service : "jobplatform server",
        status : "active",
        time : new Date()
    })
})
app.use("/auth", authRoute)
app.use("/job", jobRoute)
app.use((req, res, next) =>{
    res.json({
        status : 404,
        message : "page not found"
    })
})
app.listen(process.env.PORT, ()=>{
    console.log("server is started");
})