import React, { useState } from 'react'
import signuplogo from "../images/signuplogo.png"
import { NavLink } from 'react-router-dom'
import axios from "axios"
function Login() {
    const[err, seterr] = useState("")
    const[field, setfield] = useState({
        email : "",
        password : ""
    })
    function handlesubmit(){
        axios.post("http://localhost:5000/auth/login", field)
        .then(response => {
            console.log(response.data);
            if(response.data.message == "oops something went wrong" || 
            response.data.message == "wrong credential"){
                seterr("Invalid Email or password")
            }else{
                seterr("")
            }
        })
        .catch(err => {
            console.log("error occured");
        })
    }
  return (
    <div className='full-container'>
        <div className="left-container">
            <div className="form">
                <h1>Already have an account?</h1>
                <h3>Your personal job finder is here</h3>
                <div className="input">
                    <input type="text" placeholder='Email'
                    onChange={(e) => setfield({...field, email: e.target.value})}/>
                    <p>{err}</p>
                </div>
                <div className="input">
                    <input type="text" placeholder='Password'
                    onChange={(e) => setfield({...field, password : e.target.value})}/>
                    <p>{err}</p>
                </div>
                <button onClick={handlesubmit}>Sign In</button>
                <div>
                    <span>Don't have an account?</span><NavLink to="/register">Sign Up</NavLink>
                </div>
            </div>
        </div>
        <div className="right-container">
            <img src={signuplogo} alt="signuplogo" />
        </div>
    </div>
  )
}

export default Login