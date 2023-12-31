import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Splodo.css";
import Config from "../Config.js";
import Dropdown from "react-dropdown";
import Category from "./Category";

export default function SplodoShow(props) {
  const location = useLocation();
  const { from } = location.state;
  const navigate = useNavigate();
  const [splodoShow, setSplodoShow] = useState({});
  const [options, setOptions] = useState([
    {
      value: "loading",
      label: "waiting for cats",
    },
  ]);

  const [currentSplodoIcon, setCurrentSplodoIcon] = useState({
    name: "star",
    url: `${Config.SERVERURI}/api/icons/tier1star.png`,
  });

  const [tags, setTags] = useState([]);

  const currentSplodoCat = useRef({ value: "nocat", label: "No Category" });
  const [currentSplodoCatVar, setCurrentSplodoCatVar] = useState({
    value: "select",
    label: "select",
  });

  let tagsRender = tags.map((tag) => {
    return (
      <p key={Math.random()}>
        {tag.tagName} : {tag.tagValue}{" "}
      </p>
    );
  });

  useEffect(() => {
    fetch(`${Config.SERVERURI}/api/getSplodo?` + "splodoId=" + from, {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
     
        if (data.response[0].tags) {
          let temp = [];
          data.response[0].tags.forEach((tag) => {
            temp.push({
              tagName: tag.tagName,
              tagValue: tag.tagValue,
              index: tag.index,
            });
            setTags([...temp]);
          });
        }
  
        setSplodoShow((prev) => ({
          ...prev,
          title: data.response[0].title,
          desc: data.response[0].desc,
          url: data.response[0].url,
          catId: data.response[0].catId,
          splodoId: data.response[0]._id,
        }));
        setCurrentSplodoIcon((prev) => {
          return { ...prev, name: "icon", url: data.response[0].iconUrl };
        });
      })
    );

    fetch(`${Config.SERVERURI}/api/getCats`, {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
        let temp = [];
        data.response.forEach((cat) => {
          temp.push({
            value: cat._id,
            label: cat.title,
          });
        });

        temp.push({
          value: "nocat",
          label: "No Category",
        });

        setOptions(temp);
      })
    );

    fetch(`${Config.SERVERURI}/api/getTags?` + "splodoId=" + from, {
      credentials: "include",
    }).then((response) => response.json().then((data) => {}));
  }, []);

  useEffect(() => {
    let temp = {};
    options.forEach((category) => {
      if (category.value == splodoShow.catId) {
        temp = { value: category.value, label: category.label };
      }
    });

    if (temp != {}) {
      currentSplodoCat.current = temp;
      setCurrentSplodoCatVar(temp);
    }
  }, [splodoShow.catId, options]);

  return (
    <div className="Splodo">
      <div className="card SplodoContainer">
        <div className="wrapperCon">
          <h1 className="splodoTitle">{splodoShow.title}</h1>
          <p className="splodoDescChange">{splodoShow.desc}</p>

          <p>{currentSplodoCatVar.label}</p>

          <div className="tagArea">
            <h3>Tags</h3>
            {tagsRender}
          </div>
        </div>
      </div>

      <div className="iconArea card">
        <img src={currentSplodoIcon.url} alt={currentSplodoIcon.name}></img>
      </div>
    </div>
  );
}
