import React, { useRef, useState, useEffect } from "react";
import "./New.css";
import Config from "../Config.js";
import Dropdown from "react-dropdown";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function New() {
  const [options, setOptions] = useState([
    {
      value: "loading",
      label: "waiting for cats",
    },
  ]);

  const [iconOptions, setIconOptions] = useState([]);

  const [iconMenuStyle, setIconMenuStyle] = useState({ display: "none" });

  const [currentSplodoIcon, setCurrentSplodoIcon] = useState({
    name: "star",
    url: `${Config.SERVERURI}/api/icons/tier1star.png`,
  });
  const navigate = useNavigate();

  const titleRef = useRef();
  const descRef = useRef();

  const newTagNameRef = useRef();
  const newTagValueRef = useRef();


  // REF FOR CURRENT CATEGORY
  const currentSplodoCat = useRef({ value: "nocat", label: "No Category" });

  // STATE FOR CURRENT CATEGORY
  const [currentSplodoCatVar, setCurrentSplodoCatVar] = useState({
    value: "nocat",
    label: "No Category",
  });

  const location = useLocation();

  const [tags, setTags] = useState([]);


  // ON MOUNT
  useEffect(() => {

    // GETTING CATS AND ATTACHING THERE VIA setOptions TO THE DROPDOWN
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


    // IF THE USER HAVE ARRIVED FROM DIRECTORY, SETTING THE CATSELECT ACCORDINGLY.
    if (location.state != null) {
      currentSplodoCat.current = { value: location.state.fromCat,  label: location.state.fromCatName };

      console.log(location.state.fromCat)

      setCurrentSplodoCatVar({ value: location.state.fromCat,  label: location.state.fromCatName });

    } else {
      currentSplodoCat.current = { value: "nocat", label: "No Category" };
      setCurrentSplodoCatVar({ value: "nocat", label: "No Category" });
    }


    // GETTING THE ICONS FROM API 
    fetch(`${Config.SERVERURI}/api/getIcons`, {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
        let temp = [];

        data.response.forEach((icon) => {
          temp.push({ name: icon, url: `${Config.SERVERURI}/api/icons/` + icon });
        });

        setIconOptions(temp);
      })
    );

    console.log(currentSplodoCat.current);
  }, []);

  // SETTING REF WHEN CHOOSING CAT
  function onCatSelect(event) {
    currentSplodoCat.current = event;
  }


  // POSTING SPLODO
  function postSplodo() {
    console.log(currentSplodoCat.current.value);

    (async () => {
      const rawResponse = await fetch(`${Config.SERVERURI}/api/new`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: titleRef.current.value,
          desc: descRef.current.value,
          tags: tags,
          catId: currentSplodoCat.current.value,
          iconUrl: currentSplodoIcon.url,
        }),
      });
      const content = await rawResponse.text();

      if (content == "created") {
        navigate("/profile");
      } else {
        console.log("creation failed");
      }
    })();
  }

  function onTagRemove(_index) {
    let temp = tags;
    let newArr = removeObjectWithId(temp, _index);
    setTags([...newArr]);
  }

  function removeObjectWithId(arr, index) {
    const objWithIdIndex = arr.findIndex((obj) => obj.index === index);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }

    return arr;
  }

  function onNewTag() {
    let temp = tags;
    let max = 0;
    temp.forEach((tag) => {
      if (tag.index >= max) {
        max = tag.index;
      }
    });

    max++;

    temp.push({
      tagName: newTagNameRef.current.value,
      tagValue: newTagValueRef.current.value,
      index: max,
    });

    setTags([...temp]);
  }

  let tagsRender = tags.map((tag) => {
    return (
      <p key={tag.tagName + tag.tagValue + tag.index}>
        {tag.tagName} : {tag.tagValue}{" "}
        <button className="tagRemoveBtn" onClick={() => onTagRemove(tag.index)}>
          REMOVE
        </button>
      </p>
    );
  });

  function onIconClick(url, name) {
    setCurrentSplodoIcon((prev) => {
      return { ...prev, name: name, url: url };
    });
    setIconMenuStyle((prev) => {
      return { ...prev, display: "none" };
    });
  }

  function onIconChangeClick() {
    setIconMenuStyle((prev) => {
      return { ...prev, display: "block" };
    });
  }

  let iconRender = iconOptions.map((icon) => {
    return (
      <div
        key={icon.iconUrl}
        onClick={() => onIconClick(icon.url, icon.name)}
        className="choiceIcon"
      >
        {" "}
        <img className="choiceIconImg" src={icon.url}></img>{" "}
      </div>
    );
  });

  return (
    <div className="New">
      <div className="NewSplodoForm card">
        <div className="wrapperCon">
          <input
            className="inputHeader"
            ref={titleRef}
            placeholder="Title"
          ></input>
          <textarea className="inputDesc" ref={descRef}></textarea>

          <Dropdown
            className="dropdown"
            menuClassName="dropdownList"
            options={options}
            onChange={onCatSelect}
            ref={currentSplodoCat}
            value={currentSplodoCatVar}
            placeholder={currentSplodoCat.current.label}
          ></Dropdown>

          <div className="tagArea">
            <div className="tagArea">
              <div className="newTagArea">
                <input
                  className="tagName"
                  ref={newTagNameRef}
                  placeholder="Tag Name"
                ></input>
                <p className="divider">:</p>
                <input
                  className="tagValue"
                  ref={newTagValueRef}
                  placeholder="Value"
                ></input>
                <button id="newTagBtn" onClick={onNewTag}>
                  Add
                </button>
              </div>

              {tagsRender}
            </div>
          </div>

          <button className="submitBtn" onClick={postSplodo}>
            Create Splodo
          </button>
        </div>
      </div>

      <div className="iconArea card">
        <img
          onClick={onIconChangeClick}
          src={currentSplodoIcon.url}
          alt={currentSplodoIcon.name}
        ></img>
        <div style={iconMenuStyle} className="iconCollection">
          {iconRender}
        </div>
      </div>
    </div>
  );
}
