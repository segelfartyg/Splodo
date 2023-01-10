import React from "react";
import "./ProfilePicArea.css";

export default function ProfilePicArea(props) {
  return (
    <div className="profilePicArea">
      <div className="profileDetails">
        <h2 className="profileName">segelfartyg</h2>
        <h3 className="role">Admin</h3>
        <h3 className="profileURL">
          <a>www.github.com/segelfartyg</a>
        </h3>
      </div>

      <div className="imageDiv">
        <img src="./segelfartyg.png" className="profilePic"></img>

        <div className="roleStatus"></div>
      </div>
    </div>
  );
}
