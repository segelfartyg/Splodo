import React, { useEffect, useState} from 'react';
import BounceComponent from './BounceComponent.js';
import { Link, useLocation } from "react-router-dom";
import Config from "../Config.js"
import "./Bounce.css";


export default function Bounce() {

    const location = useLocation();
 
    const { from } = location.state;
    console.log(from)
    const [categorySplodos, setCategorySplodos] = useState([])

 

    useEffect(() => {
        //setCatTitle(title)
        GetCategorySplodos();
      }, []);

      function GetCategorySplodos(){
        fetch(Config.SERVERURI + "/getCatSplodos?" + "catId=" + "63c6806cbadbbd0bfd5a586c", {
          credentials: "include",
        }).then((response) =>
          response.json().then((data) => {
            console.log(data);
    
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
          <BounceComponent key={splodo.splodoId} title={splodo.title} desc={splodo.desc}>
          
          </BounceComponent>
        );
      });



  return (
    <div className="bounceArea">

            {splodoRender}
        


    </div>
  )
}
