import React, { useEffect, useState, useRef } from "react";
import "./IndividualSplodo.css";
import { Link } from "react-router-dom";

export default function IndividualSplodo(props) {

// FUNCTION THAT CHECKS WETHER OR NOT A SPLODO SHOULD DIRECT TO OTHER PAGE 
  function onSplodoClick() {
    if (props.onlyShow) {
      props.tags.forEach((tag) => {
        if (tag.tagName == "url") {
          window.location.href = tag.tagValue;
          return;
        }
      });
    }
  }

  const [splodoLink, setSplodoLink] = useState();


  // ON MOUNT IT CHECKS IF THERE IS A GLOBAL FUNCTION ATTACHED TO THE SPECIFIC SPLODO. IF THERE IS A GLOBAL FUNCTION
  // ATTACHED, THEN NO FORWARDINGLINK TO THE SPLODO IS ATTACHED TO THE COMPONENT. THE FORWARDING LINK IS ALSO ALWAYS ATTACHED
  // IF THE USER IS LOGGED IN TO ITS PROFILE PAGE. 
  useEffect(() => {
    let foundFunction = false;

    console.log(props.onlyShow);

    if (props.onlyShow) {
      props.tags.forEach((tag) => {
        if (tag.tagName == "url") {
          foundFunction = true;
          return;
        }
      });
    }

    if (!foundFunction) {
      if (props.onlyShow) {
        setSplodoLink("/splodoshow");
      } else {
        setSplodoLink("/splodo");
      }
    }
  }, []);

  return (
    <div onClick={onSplodoClick} className="IndividualSplodo browseItem">
      <Link className="Link" to={splodoLink} state={{ from: props.splodoId }}>
        <div className="folderContent">
          <div className="imageAndTitle">
            <img className="splodoIcon" src={props.iconUrl}></img>
            <h2>{props.title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
