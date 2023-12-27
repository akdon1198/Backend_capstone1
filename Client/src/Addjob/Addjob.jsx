import React , {useEffect, useState}from 'react'
import "./Addjob.css"
import addjob from "../images/addjob.png"
import axios from 'axios'
import {useSelector} from "react-redux"
import { commonurljobs } from '../Constant'
function Addjob() {
    const {jobdata} = useSelector(store => store.job)
    console.log(jobdata);
    const[jobfield, setjobfield] = useState({
        companyname : jobdata.aboutcompany || "",
        logourl : jobdata.logourl || "",
        jobpos : jobdata.jobpos || "",
        salary : jobdata.salary || "",
        type : jobdata.type || "",
        remote : jobdata.remote || "",
        location : jobdata.location || "",
        jobdes : jobdata.jobdes || "",
        aboutcompany : jobdata.aboutcompany || "",
        skillsrequired : jobdata.skillsrequired || "",
        information : jobdata.information || ""
    })
    console.log(jobfield);
    function handleaddjob(){
        let jsonjob = jobdata
        if(JSON.stringify(jsonjob) != "{}"){
            axios.patch(`${commonurljobs}/${jobdata._id}`, jobfield)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
        }else{
            axios.post("http://localhost:5000/job/jobdesc", jobfield)
            .then(response =>{
                console.log(response.data);
            })
            .catch(err => {
                console.log("error occured");
            })
        }
    }
    function handlecancel(){
        console.log("clicked");
        setjobfield({
            companyname : "",
            logourl : "",
            jobpos : "",
            salary : "",
            type : "",
            remote : "",
            location : "",
            jobdes : "",
            aboutcompany : "",
            skillsrequired : "",
            information : ""
        })
        console.log(jobfield);
    }
  return (
    <div className="addjobfull-container">
        <div className="addjobleft">
            <div className="addjobform">
                <h1>Add job description</h1>
                <div className='labelinput'>
                    <label >Company Name</label>
                    <input type="text" placeholder='Enter your company name here'
                    onChange={(e) => setjobfield({...jobfield, companyname : e.target.value})}
                    value={jobfield.companyname}/>
                </div>
                <div className='labelinput'>
                    <label >Add logo URL</label>
                    <input type="text" placeholder='Enter the link'
                    onChange={(e) => setjobfield({...jobfield, logourl : e.target.value})}
                    value={jobfield.logourl}/>
                </div>
                <div className='labelinput'>
                    <label >Job position</label>
                    <input type="text" placeholder='Enter the link'
                    onChange={(e) => setjobfield({...jobfield, jobpos : e.target.value})}
                    value={jobfield.jobpos}/>
                </div>
                <div className='labelinput'>
                    <label >Monthly salary</label>
                    <input type="text" placeholder='Enter Amount in rupees'
                    onChange={(e) => setjobfield({...jobfield, salary : e.target.value})}
                    value={jobfield.salary}/>
                </div>
                <div className='labelinput'>
                    <label >Job Type</label>
                    <select onChange={(e) => setjobfield({...jobfield, type : e.target.value})}
                    value={jobfield.type}>
                        <option disabled>Select</option>
                        <option>Part-time</option>
                        <option>Full-time</option>
                    </select>
                </div>
                <div className='labelinput'>
                    <label >Remote/office</label>
                    <select onChange={(e) => setjobfield({...jobfield, remote : e.target.value})}
                    value={jobfield.remote}>
                        <option disabled>Select</option>
                        <option>Remote</option>
                        <option>Office</option>
                    </select>
                </div>
                <div className='labelinput'>
                    <label >Location</label>
                    <input type="text" placeholder='Enter Location'
                    onChange={(e) => setjobfield({...jobfield, location : e.target.value})}
                    value={jobfield.location}/>
                </div>
                <div className='labelinput'>
                    <label >Job Description</label>
                    <textarea placeholder='Type the job description'
                    onChange={(e) => setjobfield({...jobfield, jobdes : e.target.value})}
                    value={jobfield.jobdes}>
                    </textarea>
                </div>
                <div className='labelinput'>
                    <label >About Company</label>
                    <textarea placeholder='Type about your company'
                    onChange={(e) => setjobfield({...jobfield, aboutcompany : e.target.value})}
                    value={jobfield.aboutcompany}>
                    </textarea>
                </div>
                <div className='labelinput'>
                    <label >Skills Required</label>
                    <input type="text" placeholder='Enter the must have skills'
                    onChange={(e) => setjobfield({...jobfield, skillsrequired : e.target.value})}
                    value={jobfield.skillsrequired}/>
                </div>
                <div className='labelinput'>
                    <label >information</label>
                    <input type="text" placeholder='Enter the must have skills'
                    onChange={(e) => setjobfield({...jobfield, information : e.target.value})}
                    value={jobfield.information}/>
                </div>
                <div className="button">
                    <button onClick={handlecancel}>Cancel</button>
                    <button onClick={handleaddjob}>+Add job</button>
                </div>
            </div>
        </div>
        <div className="addjobright">
            <img src={addjob} alt="" />
        </div>
    </div>
  )
}

export default Addjob