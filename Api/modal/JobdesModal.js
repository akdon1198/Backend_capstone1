const mongoose = require("mongoose")

const jobdesschema = new mongoose.Schema({
    companyname : {type : String, required : true},
    logourl : {type : String, required : true},
    jobpos : {type : String, required : true},
    salary : {type : String, required : true},
    type : {type : String, enum : ["Full-time", "Part-time"], required : true},
    remote : {type : String, enum : ["Remote", "Office"], required : true},
    location : {type : String, required : true},
    jobdes : {type : String, required : true},
    aboutcompany : {type : String, required : true},
    skillsrequired : {type : [String], required : true},
    information : {type : String, required : true}
})  

module.exports = mongoose.model("jobdes", jobdesschema)