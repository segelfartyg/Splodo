import React, {useEffect, useState} from "react";
import "./IndividualSplodo.css";
import { Link } from "react-router-dom";

export default function IndividualSplodo(props) {
  function onSplodoClick() {}

  const [splodoLink, setSplodoLink] = useState("/splodo")

  useEffect(() => {
    console.log(props.onlyShow)
    if(props.onlyShow){
      setSplodoLink("/splodoshow");
    }
    
  }, [])
  

  console.log(props.splodoId)
 console.log(props.iconUrl)
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
