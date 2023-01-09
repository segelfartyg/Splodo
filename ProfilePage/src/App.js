import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import BrowseArea from "./BrowseArea";
import Header from "./Header.js"
import ProfilePicArea from "./ProfilePicArea";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Profile from "./Profile.js";
import Feed from "./Feed.js";
import New from "./New.js";
import Splodo from "./Splodo.js"
import About from "./About.js"
import Config from "../Config.js";
import axios from "axios"

function App() {

    const [mobileNavStyle, setMobileNavStyle] = useState({animation: "none"})


   function onHamburgerClick(){


    if(mobileNavStyle.animation == "none"){
        setMobileNavStyle(prev => {
            return {...prev, animation: "navRight 0.5s forwards"}
        } )
    }
    else if(mobileNavStyle.animation == "navRight 0.5s forwards"){
        setMobileNavStyle(prev => {
            return {...prev, animation: "navLeft 0.5s forwards"}
        } )

    }
    else if(mobileNavStyle.animation == "navLeft 0.5s forwards"){
        setMobileNavStyle(prev => {
            return {...prev, animation: "navRight 0.5s forwards"}
        } )
    }


   } 


if(envVariable != undefined){
    Config.SERVERURI = envVariable
    Object.freeze(Config)
}

useEffect(() => {
console.log(Config);
}, [])

function onLogin(){

    


    window.open(Config.SERVERURI+"/google", "_self");



}

function onLogOut(){

    


    axios.get(Config.SERVERURI +"/logout", {
        withCredentials: true
    }).then((res) => {
        if (res.data == "logged out") {
            window.location.href = "/"
            localStorage.removeItem("user");
            //window.location.reload();
        }
    })



}



    return (
        <div className="App">
  
  <BrowserRouter>
          <div onClick={onHamburgerClick} className="hamburger">
            <h1>=</h1>
          </div>
                    <div style={mobileNavStyle} className="mobileNav">
                    <Link to="/profile"><p>Profile</p></Link>
                    <Link to="/new"><p>New Splodo</p></Link>
                    <Link to="/community"><p>Community</p></Link>
                    <Link to="/about"><p>What is Splodo?</p></Link>
                    <h2 onClick={onHamburgerClick}>X</h2>
                    </div>

   
            <div className="main">
             
           
                <div className="navBar">
                    <Link to="/profile"><p>Profile</p></Link>
                    <Link to="/new"><p>New Splodo</p></Link>
                    <Link to="/community"><p>Community</p></Link>
                    <Link to="/about"><p>What is Splodo?</p></Link>
                </div> 
                
                   
                
               
               
               
                    <Routes>
                            <Route index element={<Feed />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="new" element={<New />} />
                            <Route path="featured" element={<Splodo />} />
                            <Route path="about" element={<About />} />
                            <Route path="splodo" element={<Splodo />} />
                    </Routes>
                
                
                
             

                
                <button className="loginBtn" onClick={onLogin}><img className="googleLoginPic" src="./google-tile.svg"></img><p>LOGIN WITH GOOGLE</p></button>
                   
                <button className="logoutBtn" onClick={onLogOut}>LOGOUT</button>
            </div>
            </BrowserRouter>
        </div>
    );
}

export default App;