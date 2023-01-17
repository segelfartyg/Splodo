import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import BrowseArea from "./BrowseArea";
import Header from "./Header.js";
import ProfilePicArea from "./ProfilePicArea";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "./Profile.js";
import Feed from "./Feed.js";
import New from "./New.js";
import Splodo from "./Splodo.js";
import About from "./About.js";
import CategoryView from "./CategoryView.js"
import Config from "../Config.js";
import axios from "axios";
import Login from "./Login.js"

function App() {
  const [mobileNavStyle, setMobileNavStyle] = useState({ animation: "none" });

  function onHamburgerClick() {
    if (mobileNavStyle.animation == "none") {
      setMobileNavStyle((prev) => {
        return { ...prev, animation: "navRight 0.5s forwards" };
      });
    } else if (mobileNavStyle.animation == "navRight 0.5s forwards") {
      setMobileNavStyle((prev) => {
        return { ...prev, animation: "navLeft 0.5s forwards" };
      });
    } else if (mobileNavStyle.animation == "navLeft 0.5s forwards") {
      setMobileNavStyle((prev) => {
        return { ...prev, animation: "navRight 0.5s forwards" };
      });
    }
  }

  if (envVariable != undefined) {
    Config.SERVERURI = envVariable;
    Object.freeze(Config);
  }

  useEffect(() => {
    console.log(Config);
  }, []);

 

  function onLogOut() {
    axios
      .get(Config.SERVERURI + "/logout", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        if (res.data == "Logged out") {
         
          window.location.href = "/login";
          localStorage.removeItem("user");
          //window.location.reload();
        }
      });
  }

  return (
    <div className="App">

<div className="hamburgerOverlayDiv">
<div onClick={onHamburgerClick} className="hamburger">
          <div className="hamburgerTile"></div>
          <div className="hamburgerTile"></div>
          <div className="hamburgerTile"></div>
</div>

</div>

      <BrowserRouter>
       
        <div style={mobileNavStyle} className="mobileNav">
          <div className="mobileNavInner">
          <Link to="/profile">
            <p>Profile</p>
          </Link>
          <Link to="/new">
            <p>New Splodo</p>
          </Link>
          <Link to="/community">
            <p>Community</p>
          </Link>
          <Link to="/about">
            <p>What is Splodo?</p>
          </Link>
          <h2 onClick={onHamburgerClick}>X</h2>
          </div>
        </div>

        <div className="main">

       

          <div className="navBar">
            <Link to="/profile">
              <p>Profile</p>
            </Link>
            <Link to="/new">
              <p>New Splodo</p>
            </Link>
            <Link to="/community">
              <p>Community</p>
            </Link>
            <Link to="/about">
              <p>What is Splodo?</p>
            </Link>
          </div>

          <Routes>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="new" element={<New />} />
            <Route path="featured" element={<Splodo />} />
            <Route path="about" element={<About />} />
            <Route path="splodo" element={<Splodo />} />
            <Route path="category" element={<CategoryView />} />
            <Route path="login" element={<Login />} />
          </Routes>

          
        
        </div>
      </BrowserRouter>
      <button className="logoutBtn" onClick={onLogOut}>
            LOGOUT
      </button>
    </div>
  );
}

export default App;
