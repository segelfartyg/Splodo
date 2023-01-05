import React from 'react'
import "./IndividualSplodo.css";
import {Link} from "react-router-dom";
export default function IndividualSplodo(props) {
    

  function onSplodoClick(){

  }
  
  
    return (
    <div onClick={onSplodoClick}className="IndividualSplodo browseItem">
        <Link className="Link" to="/splodo" state={{from: props.splodoId}}>
        <div className="folderContent">
    <div className="imageAndTitle">
        <img className="splodoIcon" src="./star.png"></img>
        <h2>{props.title}</h2>
      
    </div>
   
   
    </div>
    </Link>
    </div>
  )
}
