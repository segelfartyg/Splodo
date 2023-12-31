import React from "react";
import { Outlet, Link } from "react-router-dom";
import Login from "./Login";
import Config from "../Config";
import "./Feed.css";

export default function Feed() {
  function onLogin() {
    window.open(`${Config.SERVERURI}/api/google`, "_self");
  }

  return (
    <div className="Feed">
      <div className="con">
        <h1>Welcome to the Splodo Platform!</h1>
        <p>Login using your Google account and start writing Splodos today.</p>
        <button className="loginBtn" onClick={onLogin}>
          <img className="googleLoginPic" src="./google-tile.svg"></img>
          <p>LOGIN WITH GOOGLE</p>
        </button>
      </div>
    </div>
  );
}
