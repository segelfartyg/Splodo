import React, {useEffect} from "react";
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

    


    axios.get("http://localhost:3000/logout", {
        withCredentials: true
    }).then((res) => {
        if (res.data === "logged out") {
            window.location.href = "/"
            localStorage.removeItem("user");
            window.location.reload();
        }
    })



}



    return (
        <div className="App">
   
            <div className="main">
                <BrowserRouter>
                    <Routes>
                            <Route index element={<Feed />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="new" element={<New />} />
                            <Route path="featured" element={<Splodo />} />
                            <Route path="about" element={<About />} />
                    </Routes>
                
                    <Link to="/profile">Profile</Link>
                <Link to="/new">New Splodo</Link>
                <Link to="/featured">Featured Splodo</Link>
                
                <Link to="/about">What is Splodo?</Link>
                
                </BrowserRouter>

                
                <button className="loginBtn" onClick={onLogin}><img className="googleLoginPic" src="./google-tile.svg"></img><p>LOGIN WITH GOOGLE</p></button>
                   
                <button className="logoutBtn" onClick={onLogOut}>LOGOUT</button>
            </div>
        </div>
    );
}

export default App;