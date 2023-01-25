import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SplodoListItem(props) {
  const [hidden, setHidden] = useState({
    height: "0rem",
    borderBottom: "solid black 0px",
  });

  useEffect(() => {
    console.log(props.chosenCat, props.catId);
    if (props.chosenCat == props.catId) {
      if (hidden.height == "0rem") {
        setHidden((prev) => {
          return { ...prev, height: "3rem", borderBottom: "solid black 1px" };
        });
      } else {
        setHidden((prev) => {
          return { ...prev, height: "0rem", borderBottom: "solid black 0px" };
        });
      }

      console.log("hej");
    } else {
    }
  }, [props.childrenHide]);

  return (
    <div className="splodoListItem" style={hidden}>
      <Link to="/splodo" state={{ from: props.splodoId }}>
        <p>{props.title}</p>
      </Link>
    </div>
  );
}
