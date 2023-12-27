import React, { useState } from 'react'
import signuplogo from "../images/signuplogo.png"
import { NavLink, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { handleuser } from '../jobslice'
function Login() {
    const[err, seterr] = useState("")
    const dispatch = useDispatch()
    const history = useNavigate()
    const[field, setfield] = useState({
        email : "",
        password : ""
    })
    function handlesubmit(){
        axios.post("http://localhost:5000/auth/login", field)
        .then(response => {
            if(response.data.message == "oops something went wrong" || 
            response.data.message == "wrong credential"){
                seterr("Invalid Email or password")
            }else{
                console.log(response.data.jwttoken);
                localStorage.setItem("token", JSON.stringify(response.data.jwttoken))
                dispatch(handleuser(true))
                history("/")
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