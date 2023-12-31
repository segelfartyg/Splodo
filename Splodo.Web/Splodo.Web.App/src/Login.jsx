import React from "react";
import "./Login.css";
import Config from "../Config";

export default function Login() {
  function onLogin() {
    window.open(`${Config.SERVERURI}/api/google`, "_self");
  }

  return (
    <div className="login">
      <div className="loginContainer card">
        <h1>LOGIN TO SPLODO</h1>
        <button className="loginBtn" onClick={onLogin}>
          <img className="googleLoginPic" src="./google-tile.svg"></img>
          <p>LOGIN WITH GOOGLE</p>
        </button>
      </div>
    </div>
  );
}
