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
    props.setChosenCat(catid);
  }

  function onNewFolderPress() {
    props.onNewFolderPress();
  }

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
        onlyShow={props.onlyShow}
      ></IndividualSplodo>
    );
  });

  return (
    <div className="browseArea">
      {catRender}
      {splodoRender}

      <div>
        {!props.onlyShow && (
          <button className="browseAreaBtn" onClick={onNewFolderPress}>
            New Directory
          </button>
        )}
      </div>
    </div>
  );
}
