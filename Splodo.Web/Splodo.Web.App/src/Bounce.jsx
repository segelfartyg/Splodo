import React, { useEffect, useState} from 'react';
import BounceComponent from './BounceComponent.jsx';
import { Link, useLocation } from "react-router-dom";
import Config from "../Config.js"
import "./Bounce.css";


export default function Bounce(props) {

    const location = useLocation();
 
    const { from } = location.state;
  
    const [categorySplodos, setCategorySplodos] = useState([])


    const [bounceBool, setBounceBool] = useState(true)
 

    useEffect(() => {
        //setCatTitle(title)
        GetCategorySplodos();
      }, []);

      function GetCategorySplodos(){
        fetch("/api/getCatSplodos?" + "catId=" + from, {
          credentials: "include",
        }).then((response) =>
          response.json().then((data) => {
           
            let temp = [];
            data.splodos.forEach((splodo) =>{

                temp.push({
                    splodoId: splodo._id,
                    title: splodo.title,
                    catId: splodo.catId,
                    desc: splodo.desc
                })
            })
            setCategorySplodos(temp);
          })
        );
      }


      let splodoRender = categorySplodos.map((splodo) => {
        return (
          <BounceComponent bounceBool={bounceBool} key={splodo.splodoId} title={splodo.title} desc={splodo.desc}>
          
          </BounceComponent>
        );
      });



  return (
    <div className="bounceArea">

            {splodoRender}
        


    </div>
  )
}
