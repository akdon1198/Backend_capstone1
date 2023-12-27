import Addjob from "./Addjob/Addjob";
import Jobdetail from "./Jobdetail/Jobdetail";
import Login from "./Login/Login";
import Register from "./Register/Register";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Filterjob from "./Filterjob/Filterjob";
import { useContext, useEffect, useState } from "react";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/addjob" element={<Addjob/>}/>
        <Route path="/jobdetail/:id" element={<Jobdetail />}/>
        <Route exact path="/" element={<Filterjob/>}/>
      </Routes>
    </Router>
  );
}

export default App;
