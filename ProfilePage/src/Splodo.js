import React, {useState, useEffect} from 'react';
import {useLocation} from "react-router-dom";
import "./Splodo.css"
import Config from "../Config";
export default function Splodo(props) {

  const location = useLocation();
  const { from } = location.state;


  const [splodoShow, setSplodoShow] = useState({});


  useEffect(() => {


          fetch(Config.SERVERURI + "/getSplodo?" + "splodoId=" + from, {credentials: "include"})
        .then((response) => response.json()
        .then ((data) => {
          console.log(data.response[0])
        

          setSplodoShow(prev => ({
            ...prev,
            title: data.response[0].title,
            desc: data.response[0].desc,
            url: data.response[0].url,
            splodoId: data.response[0]._id
          }))

        }))


  }, [])
  


  console.log(from)
  return (
    <div className="Splodo">

      <div className="card SplodoContainer">

        <h1>{splodoShow.title}</h1>
        <p>{splodoShow.desc}</p>
          <div>
            <div className="tag">Book</div>
          </div>
        <a href={splodoShow.url}>{splodoShow.url}</a>
      </div>
    </div>
  )
}
