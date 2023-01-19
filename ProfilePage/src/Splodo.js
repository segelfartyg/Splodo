import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Splodo.css";
import Config from "../Config";
import Dropdown from "react-dropdown";
import Category from "./Category";

export default function Splodo(props) {
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

  const newTagNameRef = useRef();
  const newTagValueRef = useRef();

  const splodoNameChangeRef = useRef();
  const splodoDescChangeRef = useRef();

  const [tags, setTags] = useState([]);

  const currentSplodoCat = useRef({ value: "nocat", label: "No Category" });
  const [currentSplodoCatVar, setCurrentSplodoCatVar] = useState({
    value: "select",
    label: "select",
  });


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
      <p key={Math.random()}>
        {tag.tagName} : {tag.tagValue}{" "}
        <button className="tagRemoveBtn" onClick={() => onTagRemove(tag.index)}>
          REMOVE
        </button>
      </p>
    );
  });

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

  function onCatSelect(event) {
    console.log(event);
    currentSplodoCat.current = event;
  }

  function onSaveClick() {
    (async () => {
      const rawResponse = await fetch(Config.SERVERURI + "/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: splodoNameChangeRef.current.value,
          desc: splodoDescChangeRef.current.value,
          // url: urlRef.current.value,
          tags: tags,
          catId: currentSplodoCat.current.value,
          splodoId: from,
        }),
      });
      const content = await rawResponse.text();

      if (content == "saved") {
        navigate("/profile");
      } else {
        console.log("save failed");
      }
    })();
  }

  function onDeleteClick() {
    (async () => {
      const rawResponse = await fetch(Config.SERVERURI + "/deleteSplodo", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          splodoId: from,
        }),
      });
      const content = await rawResponse.text();

      if (content == "deleted") {
        navigate("/profile");
      } else {
        console.log("error during deletion");
      }
    })();
  }

  useEffect(() => {
    fetch(Config.SERVERURI + "/getSplodo?" + "splodoId=" + from, {
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
      })
    );

    fetch(Config.SERVERURI + "/getCats", {
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

    fetch(Config.SERVERURI + "/getTags?" + "splodoId=" + from, {
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
          <input
            defaultValue={splodoShow.title}
            className="splodoTitle"
            ref={splodoNameChangeRef}
          ></input>
          <textarea
            defaultValue={splodoShow.desc}
            className="splodoDescChange"
            ref={splodoDescChangeRef}
          ></textarea>

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

          <div className="buttonArea">
            <button className="saveSplodo" onClick={onSaveClick}>
              SAVE SPLODO
            </button>
            <button className="saveSplodo" onClick={onDeleteClick}>
              DELETE SPLODO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
