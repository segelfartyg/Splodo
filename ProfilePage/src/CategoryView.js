import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./CategoryView.css"
import Config from "../Config.js"
import IndividualSplodo from "./IndividualSplodo";

export default function CategoryView(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const { from, title } = location.state;
    const [catTitle, setCatTitle] = useState("");
    const [categorySplodos, setCategorySplodos] = useState([])
    const [catNameChangeStyle, setCatNameChangeStyle] = useState({display: "none"})
    const catNameChangeRef = useRef()

    useEffect(() => {
        setCatTitle(title)
        GetCategorySplodos();
      }, []);

      function GetCategorySplodos(){
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
      }
 
      let splodoRender = categorySplodos.map((splodo) => {
        return (
          <IndividualSplodo
            key={splodo.splodoId}
            splodoId={splodo.splodoId}
            title={splodo.title}
          ></IndividualSplodo>
        );
      });

      function onCatNameChangePress(){
        if(catNameChangeStyle.display == "none"){
          setCatNameChangeStyle(prev => { return {...prev, display: "block"} })
        }
      }

      function onCatNameChangeSubmit(){

        setCatNameChangeStyle(prev => { return {...prev, display: "none"} })
        if(catNameChangeRef.current.value.length >= 1){
          (async () => {
            const rawResponse = await fetch(Config.SERVERURI + "/catNameChange", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                name: catNameChangeRef.current.value,
                catId: from
              }),
            });
            const content = await rawResponse.text();
            
            setCatNameChangeStyle(prev => { return {...prev, display: "none"} })
            setCatTitle(catNameChangeRef.current.value)
          })();
  
  
        }

      }

      function onCatDelete(){
  
          (async () => {
            const rawResponse = await fetch(Config.SERVERURI + "/deleteCat", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                catId: from
              }),
            });
            const content = await rawResponse.text();
           
        
            if(content == "deleted"){
              navigate("/profile")
            }
            else{
              console.log("error during deletion")
            }
          })();
      
      
      }

    return (

    <div className="CategoryView">
        
    <div className="categoryInformation">
        <div className="categoryName"><h1 onClick={onCatNameChangePress}>{catTitle}📁<input ref={catNameChangeRef} style={catNameChangeStyle} className="categoryNameChange"></input><button onClick={onCatNameChangeSubmit} style={catNameChangeStyle} className="changeCatNameBtn">SAVE</button></h1></div>
    </div>   
    <div className="browseArea">
      
      <div className="splodoWrapper">
        
        {splodoRender}
    
        </div>
        <div className="btnArea">

<button className="deleteCatBtn" onClick={onCatDelete}>Delete Directory</button>
<button className="deleteCatBtn"><Link to="/new" state={{fromCat: from, fromCatName: catTitle}}>Add Splodo</Link></button>

</div>   
        
    </div>


     
    
    </div>
  )
}
