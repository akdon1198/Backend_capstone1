import React, { useContext, useEffect, useState } from 'react'
import "./Filterjob.css"
import navbar from "../images/navbar.png"
import { commonurljobs, skillarrconst } from "../Constant"
import { skillmapping } from '../Constant'
import axios, { all } from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import userimg from "../images/userimg.png"
function Filterjob() {
  const[skillarr, setskillarr] = useState(skillarrconst)
  const[alljobs, setalljobs] = useState([])
  const history = useNavigate()
  const user = useSelector(store => store.job.user)
  console.log(alljobs);
  function selectskill(e){
    skillarr[skillmapping[e.target.value]].flag = true
    setskillarr([...skillarr])
  }
  function deselectskill(index){
    skillarr[index].flag = false
    setskillarr([...skillarr])
  }
  function clearall(){
    skillarr.map(skill => skill.flag = false)
    setskillarr([...skillarr])
  }
  useEffect(()=>{

  },[])
  useEffect(()=>{
    getfilterjob()
  },[skillarr])
  async function getfilterjob(){
    let skill = ""
    for(let i = 0; i < skillarr.length; i++){
      if(skillarr[i].flag) skill += skillarr[i].skill + "%26"
    }
    if(skill) skill = skill.slice(0, skill.length - 3)
    try{
      let jobs = skill ? await axios.get(`${commonurljobs}?skills=${skill}`)
                : await axios.get(`${commonurljobs}`)
                setalljobs(jobs.data.jobs)
    }catch(err){
      console.log("error occured");
    }
  }
  function viewdetail(id){
    console.log(id);
    history("/jobdetail/" + id)
  }
  return (
    <div className='jobdetailfull-container'>
        <div className="jobdetailnavbar">
            <img src={navbar} alt="navbar" />
            <div>
              <h2>Jobfinder</h2>
              {
                user ? 
                <div className="logout">
                <h3 style={{color:"#fff"}}>Logout</h3>
                <h3 style={{color:"#fff"}}>Hello!Recruiter</h3>
                <img src={userimg} alt="" style={{height : "2rem", width:"2rem"}}/>
                </div>
                :
                <div className="button-container">
                  <NavLink to = "/login">
                  <button>Login</button>
                  </NavLink>
                  <NavLink to = "/register">
                  <button>Register</button>
                  </NavLink>
                </div>
              }
            </div>
        </div>
        <div className="jobdetailpage">
            <div className="heading">
                <input type="text" />
                <select onChange={(e) => selectskill(e)}>
                  <option disabled>skills</option>
                  {
                    skillarr.map((skill) => {
                      return <option>{skill.skill}</option>
                    })
                  }
                </select>
                {
                  skillarr.map((skill,index) => {
                    return(
                      skill.flag && <button onClick={() => deselectskill(index)}>{skill.skill}</button>
                    ) 
                  })
                }
                <button onClick={clearall}>clear</button>
            </div>
            <div className="detail">
                {
                  alljobs.map(job=>{
                    return(
                      <div className="carddetail">
                        <div className="left">
                          <h3>{job.jobpos}</h3>
                        </div>
                        <div className="right" style={{display:"flex"}}>
                          {
                            job.skillsrequired.map(skill => <h4>{skill}</h4>)
                          }
                        </div>
                        {
                          user && <button>Edit job</button>
                        }
                        <button onClick = {()=>viewdetail(job._id)}>viewdetails</button>
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}

export default Filterjob