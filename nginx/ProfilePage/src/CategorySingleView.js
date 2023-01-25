import React, { useState } from "react";
import SplodoListItem from "./SplodoListItem";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Category.css"

export default function CategorySingleView(props) {

    const navigate = useNavigate()
    const location = useLocation();




  function onCatClick(catId) {
    props.onCatClick(props.catId);

   // navigate("/bounce", {state: { from: "/bounce"}})
  }

  return (
    <div className="containerCatSplodo">
      <Link to={props.service} state={{ from: props.catId, title: props.catName }}>
      <div onClick={() => onCatClick(props.catId)} className="browseItem">
        <div className="folderContent">
          <div className="imageAndTitle">
            <img className="splodoIcon" src="./folder.png"></img>
            <h2>{props.catName}</h2>
          </div>
       
        </div>
      </div>
      </Link>
    </div>
  );
}