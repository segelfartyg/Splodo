import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import BrowseArea from "./BrowseArea";
import ProfilePicArea from "./ProfilePicArea";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Link } from "react-router-dom";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";
import New from "./New.jsx";
import Splodo from "./Splodo.jsx";
import About from "./About.jsx";
import CategoryView from "./CategoryView.jsx";
import Config from "../Config.js";
import axios from "axios";
import Login from "./Login.jsx";
import Services from "./Services";
import Bounce from "./Bounce";
import ChooseCat from "./ChooseCat";
import ShowProfile from "./ShowProfile.jsx";
import SplodoShow from "./SplodoShow";
import Docs from "./Docs"

function App() {
  const [mobileNavStyle, setMobileNavStyle] = useState({ animation: "none" });

  // SETTING STYLE DEPENDING ON STYLING SPLODO
  const [appStyle, setAppStyle] = useState({
    background: "linear-gradient(90deg,rgb(230, 230, 230) 0%,rgb(255, 255, 255) 10%,rgb(255, 255, 255) 50%,rgb(255, 255, 255) 90%,rgb(230, 230, 230) 100%)"
  })

  useEffect(() => {
 
      Config.SERVERURI = "http://localhost.com:3000";
      
  }, []);


  // MOBILE MENU
  function onHamburgerClick() {
    if (mobileNavStyle.animation == "none") {
      setMobileNavStyle((prev) => {
        return { ...prev, animation: "navRight 0.25s forwards" };
      });
    } else if (mobileNavStyle.animation == "navRight 0.25s forwards") {
      setMobileNavStyle((prev) => {
        return { ...prev, animation: "navLeft 0.25s forwards" };
      });
    } else if (mobileNavStyle.animation == "navLeft 0.25s forwards") {
      setMobileNavStyle((prev) => {
        return { ...prev, animation: "navRight 0.25s forwards" };
      });
    }
  }

  function onLogOut() {
    axios
      .get("/api/logout", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data == "Logged out") {
          window.location.href = "/login";
          localStorage.removeItem("user");
          //window.location.reload();
        }
      });
  }


  // CHANGING STYLE FROM PROFILE AND SHOWPROFILE
  function changePageStyle(stylingprops) {
    let colorstring = "";
    stylingprops.colors.forEach((color) => {
      colorstring += `, ${color}`
    })

    setAppStyle(prev => {
      return { ...prev, background: `linear-gradient(${stylingprops.deg} ${colorstring})` }
    })
  }

  return (
    <div className="App" style={appStyle}>
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
            <Link onClick={onHamburgerClick} to="/profile">
              <p>Profile</p>
            </Link>
            <Link onClick={onHamburgerClick} to="/new">
              <p>New Splodo</p>
            </Link>
            <Link onClick={onHamburgerClick} to="/services">
              <p>Community</p>
            </Link>
            <Link onClick={onHamburgerClick} to="/about">
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
            <Link to="/services">
              <p>Community</p>
            </Link>
            <Link to="/about">
              <p>What is Splodo?</p>
            </Link>
          </div>

          <Routes>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile changePageStyle={changePageStyle} />} />
            <Route path="new" element={<New />} />
            <Route path="featured" element={<Splodo />} />
            <Route path="about" element={<About />} />
            <Route path="splodo" element={<Splodo />} />
            <Route path="category" element={<CategoryView />} />
            <Route path="services" element={<Services />} />
            <Route path="bounce" element={<Bounce />} />
            <Route path="choosecat" element={<ChooseCat />} />
            <Route path="login" element={<Login />} />
            <Route path="splodoshow" element={<SplodoShow />} />
            <Route path="docs" element={<Docs />} />

            <Route
              path="/*"
              element={<ShowProfile props={{ value: "hej" }} changePageStyle={changePageStyle} />}
            />
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
