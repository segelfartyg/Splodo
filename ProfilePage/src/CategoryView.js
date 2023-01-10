import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./CategoryView.css"
import Config from "../Config.js"
import IndividualSplodo from "./IndividualSplodo";

export default function CategoryView() {

  

    const location = useLocation();
    const { from } = location.state;

    const [categorySplodos, setCategorySplodos] = useState([])

    useEffect(() => {
        fetch(Config.SERVERURI + "/getCatSplodos?" + "catId=" + from, {
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
                })
            })

            setCategorySplodos(temp);

          })
        );
      }, []);
 
      let splodoRender = categorySplodos.map((splodo) => {
        return (
          <IndividualSplodo
            key={splodo.splodoId}
            splodoId={splodo.splodoId}
            title={splodo.title}
          ></IndividualSplodo>
        );
      });



    return (

    <div className="CategoryView">
        
    <div className="categoryInformation">
        <h1 className="categoryName">Category Name 📁</h1>
    </div>   
    <div className="browseArea">
        {splodoRender}
    </div>

    
    </div>
  )
}
