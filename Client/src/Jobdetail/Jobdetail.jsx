import React, { useEffect, useState} from 'react'
import "./Jobdetail.css"
import userimg from "../images/userimg.png"
import navbar from "../images/navbar.png"
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adddata } from '../jobslice'
import { commonurljobs } from '../Constant'
function Jobdetail() {
  const history = useNavigate()
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  const dispatch = useDispatch()
  const job = useSelector(store => store.job)
  const[jobdetail, setjobdetail] = useState("")
  useEffect(()=>{
    axios.get(`${commonurljobs}/${id}`)
    .then(response =>{
      setjobdetail(response.data.job)
    })
    .catch(err=>{
      console.log("error occured");
    })
  },[])
  function Editjob(){
    dispatch(adddata(jobdetail))
    history("/addjob")
  }
  return (
    <div className="jobdetailfull-container">
        <div className="jobdetailnavbar">
            <img src={navbar} alt="navbar" />
            <div>
              <h2>Jobfinder</h2>
              <div className="button-container">
                <NavLink to = "/login">
                <button>Login</button>
                </NavLink>
                <NavLink to = "/register">
                <button>Register</button>
                </NavLink>
              </div>
              {/* <div className="logout">
                <h3 style={{color:"#fff"}}>Logout</h3>
                <h3 style={{color:"#fff"}}>Hello!Recruiter</h3>
                <img src={userimg} alt="" style={{height : "2rem", width:"2rem"}}/>
              </div> */}
            </div>
        </div>
        <div className="jobdetailpage">
            <div className="heading">
              <h1>{jobdetail?.companyname}</h1>
            </div>
            <div className="detail">
              <p className='jobtype'>1w ago . {jobdetail?.type}</p>
              <div style={{display:"flex", width:"50rem",justifyContent:"space-between"}}>
                <h1>{jobdetail?.jobpos}</h1>
                <button onClick={Editjob}>Edit job</button>
              </div>
              <p className='location'>{jobdetail?.location}</p>
              <div className="duration-salary">
                <div className="keyvalue">
                  <p>Stipend</p>
                  <p>{jobdetail?.salary}</p>
                </div>
                <div className="keyvalue">
                  <p>Duration</p>
                  <p>6 Months</p>
                </div>
              </div>
              <h2>About company</h2>
              <p>{jobdetail?.aboutcompany}</p>
              <h2>About the job/internship</h2>
              <p>{jobdetail?.jobdes}</p>
              <h2>Skill(s) required</h2>
              <div className="skills">
                {
                  jobdetail?.skillsrequired?.map(skill => {
                    return (
                      <p>{skill}</p>
                    )
                  })
                }
              </div>
              <h2>Additional Information</h2>
              <p>{jobdetail?.information}</p>
            </div>
        </div>
    </div>
  )
}

export default Jobdetail