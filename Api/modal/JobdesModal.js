const mongoose = require("mongoose")

const jobdesschema = new mongoose.Schema({
    // companyname : {type : String, required : true},
    // logourl : {type : String, required : true},
    jobpos : {type : String, required : true},
    // salary : {type : String, required : true},
    jobtype : {type : String, enum : ["fulltime", "parttime"], required : true},
    remote : {type : String, enum : ["remote", "office"], required : true},
    location : {type : String, required : true},
    // desc : {type : String, required : true},
    // aboutcompany : {type : String, required : true},
    skills : {type : [String], required : true},
    // additionaldetails : {type : String, required : true}
})  

module.exports = mongoose.model("jobdes", jobdesschema)