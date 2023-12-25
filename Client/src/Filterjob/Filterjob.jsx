import React from 'react'
import "./Filterjob.css"
import navbar from "../images/navbar.png"
function Filterjob() {
  return (
    <div className='jobdetailfull-container'>
        <div className="jobdetailnavbar">
            <img src={navbar} alt="navbar" />
            <div>
              <h2>Jobfinder</h2>
              <div className="button-container">
                <button>Login</button>
                <button>Register</button>
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
                <input type="text" />
                <select>
                    <option>fontend</option>
                    <option>backend</option>
                    <option>html</option>
                </select>
                <button>frontend</button>
                <button>frontend</button>
            </div>
            <div className="detail">
                <div className="carddetail">
                    <div className="left">
                        <h3>frontend</h3>
                    </div>
                    <div className="right" style={{display:"flex"}}>
                        <h4>frontend</h4>
                        <h4>css</h4>
                        <h4>javascript</h4>
                        <h4>html</h4>
                    </div>
                </div>
                <div className="carddetail"></div>
                <div className="carddetail"></div>
                <div className="carddetail"></div>
                <div className="carddetail"></div>
                <div className="carddetail"></div>
                <div className="carddetail"></div>
            </div>
        </div>
    </div>
  )
}

export default Filterjob