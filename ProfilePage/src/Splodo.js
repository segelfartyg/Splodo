import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Splodo.css";
import Config from "../Config";
import Dropdown from "react-dropdown"

export default function Splodo(props) {
  const location = useLocation();
  const { from } = location.state;

  const [splodoShow, setSplodoShow] = useState({});
  const [options, setOptions] = useState([{
    value: "loading",
    label: "waiting for cats"
}]);


  const currentSplodoCat = useRef({value: "nocat", label: "No Category"});




  function onCatSelect(event){
    console.log(event)

    currentSplodoCat.current = event;
  }

  function onSaveClick(){
    (async () => {
      const rawResponse = await fetch(Config.SERVERURI + "/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          // title: titleRef.current.value,
          // desc: descRef.current.value,
          // url: urlRef.current.value,
          catId: currentSplodoCat.current.value,
          splodoId: from
        }),
      });
      const content = await rawResponse.text();

      console.log(content);
    })();

  }

  useEffect(() => {
    fetch(Config.SERVERURI + "/getSplodo?" + "splodoId=" + from, {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
        console.log(data.response[0]);

        setSplodoShow((prev) => ({
          ...prev,
          title: data.response[0].title,
          desc: data.response[0].desc,
          url: data.response[0].url,
          splodoId: data.response[0]._id,
        }));
      })
    );


    fetch(Config.SERVERURI + "/getCats", {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
        console.log(data.response);

        let temp = []
        data.response.forEach((cat) => {

            temp.push({
              value: cat._id,
              label: cat.title
            })
        })

        temp.push({
          value: "nocat",
          label: "No Category"
        })

        setOptions(temp)
        // setSplodoShow((prev) => ({
        //   ...prev,
        //   title: data.response[0].title,
        //   desc: data.response[0].desc,
        //   url: data.response[0].url,
        //   splodoId: data.response[0]._id,
        // }));
      })
    );






  }, []);

  console.log(from);
  return (
    <div className="Splodo">
      <div className="card SplodoContainer">
        <h1>{splodoShow.title}</h1>
        <p>{splodoShow.desc}</p>
        <div>
          <div className="tag">Book</div>
        </div>
        <Dropdown className="dropdown" menuClassName="dropdownList" options={options} onChange={onCatSelect} ref={currentSplodoCat} value={currentSplodoCat.current.label} placeholder={currentSplodoCat.current.label}></Dropdown>
        <p><a href={splodoShow.url}>{splodoShow.url}</a></p>
      
        <button onClick={onSaveClick}>SAVE SPLODO</button>
      </div>
    </div>
  );
}
