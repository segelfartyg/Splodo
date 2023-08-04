import React, { useState } from "react";
import SplodoListItem from "./SplodoListItem";
import { Link } from "react-router-dom";
import "./Category.css"

export default function (props) {
  const [arrowStyle, setArrowStyle] = useState({ animation: "none" });
  const [childrenHide, setChildrenHide] = useState(false);

  function onCatClick(catId) {
    props.onCatClick(props.catId);

    if (childrenHide) {
      setChildrenHide(false);
      setArrowStyle((prev) => {
        return { ...prev, animation: "arrowRotateDown 0.5s forwards" };
      });
    } else {
      setChildrenHide(true);
      setArrowStyle((prev) => {
        return { ...prev, animation: "arrowRotateUp 0.5s forwards" };
      });
    }
  }

  return (
    <div className="containerCatSplodo">
      <Link to="/category" state={{ from: props.catId, title: props.catName, onlyShow: props.onlyShow }}>
      <div onClick={() => onCatClick(props.catId)} className="browseItem">
        <div className="folderContent">
          <div className="imageAndTitle">
            <img className="splodoIcon" src="./folder.png"></img>
            <h2>{props.catName}</h2>
          </div>
      
        </div>
      </div>
      </Link>
      <div className="splodoListItemArea">
        {props.cats.map((cat) => (
          <SplodoListItem
            key={props.catId + "_" + cat.splodoId}
            catId={props.catId}
            title={cat.title}
            splodoId={cat.splodoId}
            chosenCat={props.chosenCat}
            childrenHide={childrenHide}
          ></SplodoListItem>
        ))}
      </div>
    </div>
  );
}
