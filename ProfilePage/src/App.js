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

function App() {

if(envVariable != undefined){
    Config.SERVERURI = envVariable
    Object.freeze(Config)
}

useEffect(() => {
console.log(Config);
}, [])




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

                
                <a href={Config.SERVERURI+"/google"}>LOGIN THROUGH GOOGLE</a>
                   
                <a href={Config.SERVERURI+"/profile"}>PROFILEURL</a>
            </div>
        </div>
    );
}

export default App;