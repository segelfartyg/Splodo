import React, { useState } from "react";
import "./BrowseArea.css";
import SplodoListItem from "./SplodoListItem";
import Category from "./Category";
import { Link } from "react-router-dom";
import IndividualSplodo from "./IndividualSplodo";

export default function BrowseArea(props) {
  console.log(props.cats);

  const [chosenCat, setChosenCat] = useState(0);

  function onCatClick(catid) {
    console.log(catid);

    props.setChosenCat(catid);
  }

  function onNewFolderPress() {
    props.onNewFolderPress();
  }

  props.cats.forEach((cat) => {
    console.log(cat.catId);
  });

  let catRender = props.cats.map((cat) => {
    return (
      <Category
        key={cat._id}
        catId={cat._id}
        catName={cat.title}
        cats={cat.splodos}
        onCatClick={onCatClick}
        chosenCat={props.chosenCat}
      ></Category>
    );
  });

  let splodoRender = props.splodos.map((splodo) => {
    return (
      <IndividualSplodo
        key={splodo.splodoId}
        splodoId={splodo.splodoId}
        title={splodo.title}
        iconUrl={splodo.iconUrl}
      ></IndividualSplodo>
    );
  });

  return (
    <div className="browseArea">
      {catRender}
      {splodoRender}

      <div>
        <button className="browseAreaBtn" onClick={onNewFolderPress}>
          New Directory
        </button>
      </div>
    </div>

  );
}
