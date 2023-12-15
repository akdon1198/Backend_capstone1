import React, { useState } from 'react'
import "./Register.css"
import signuplogo from "../images/signuplogo.png"
import { NavLink } from 'react-router-dom'
import axios from "axios"
function Register() {
    const[nameerr, setnameerr] = useState("")
    const[emailerr, setemailerr] = useState("")
    const[mobileerr, setmobileerr] = useState("")
    const[passworderr, setpassworderr] = useState("")
    const[checkboxerr, setcheckboxerr] = useState(false)
    const [field, setfield] = useState({    
        name : "",
        email : "",
        mobile : "",
        password : "",
        active : false
    })
    function handleSubmit(){
        let flag = true
        if(field.name == ""){setnameerr("field is required"); flag = false}
        else setnameerr("")
        if(field.email == ""){setemailerr("field is required"); flag = false}
        else setemailerr("")
        if(field.mobile == ""){setmobileerr("field is required"); flag = false}
        else setmobileerr("")
        if(field.password == ""){setpassworderr("field is required"); flag = false}
        else setpassworderr("")
        if(field.active == false){setcheckboxerr("check this box if you want to proceed"); flag = false}
        else setcheckboxerr("")
        if(field.mobile){
            if(field.mobile.length != 10 || field.mobile[0] < 7){setmobileerr("please enter 10 digit number"); flag = false}
            else setmobileerr("")
        }
        if(field.email){
            let atsymbol = field.email.indexOf("@");
            let dotsymbol = field.email.indexOf(".")
            let spacesymbol = field.email.indexOf(" ")
            if((atsymbol) != -1 &&
               (atsymbol) != 0 &&
               (dotsymbol) != -1 &&
               (dotsymbol) != 0 &&
               (dotsymbol > atsymbol + 1)&&
               (field.email.length > dotsymbol + 1)&&
               (spacesymbol == -1)){
                    setemailerr("")
               }else{
                 setemailerr("Please Enter Right Email")
                 flag = false
               }
        }
        if(flag){
            axios.post("http://localhost:5000/auth/register", field)
            .then(response => {
                console.log(response.data);
                localStorage.setItem("token", JSON.stringify(response.data.jwttoken))
            }).catch(err=>{
                console.log("error occured");
            })
        }
    }
  return (
    <div className='full-container'>
        <div className="left-container">
            <div className="form">
                <h1>Create an account</h1>
                <h3>Your personal job finder is here</h3>
                <div className="input">
                    <input type="text" placeholder='Name'
                    onChange={(e) => setfield({...field, name : e.target.value})}/>
                    <p>{nameerr}</p>
                </div>
                <div className="input">
                    <input type="text" placeholder='Email'
                    onChange={(e) => setfield({...field, email : e.target.value})}/>
                    <p>{emailerr}</p>
                </div>
                <div className="input">
                    <input type="text" placeholder='Mobile'
                    onChange={(e) => setfield({...field, mobile : e.target.value})}/>
                    <p>{mobileerr}</p>
                </div>
                <div className="input">
                    <input type="text" placeholder='Password'
                    onChange={(e) => setfield({...field, password : e.target.value})}/>
                    <p>{passworderr}</p>
                </div>
                <div className="input" style={{display:"flex", alignItems:"center"}}>
                    <input type="checkbox" style={{width:"auto", marginRight:"10px"}}
                    onChange={(e) => setfield({...field, active : e.target.checked})}/>
                    <label style={{fontSize:"14px", fontWeight:"400", color:"#525252"}}>By creating an account, I agree to our terms of use and privacy policy</label>
                <p>{checkboxerr}</p>
                </div>
                <button onClick={handleSubmit}>Create Account</button>
                <div>
                    <span>Already have an account?</span><NavLink to="/login">Sign In</NavLink>
                </div>
            </div>
        </div>
        <div className="right-container">
            <img src={signuplogo} alt="signuplogo" />
        </div>
    </div>
  )
}

export default Register