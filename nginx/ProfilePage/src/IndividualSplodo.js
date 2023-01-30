import React, {useEffect, useState, useRef} from "react";
import "./IndividualSplodo.css";
import { Link } from "react-router-dom";

export default function IndividualSplodo(props) {


  const [continueRender, setContinueRender] = useState(false)


  function onSplodoClick() {

    if(props.onlyShow){

      props.tags.forEach((tag) => {
        if(tag.tagName == "url"){
          window.location.href = tag.tagValue;
          return
        }
       
      })

    }
   



  }

  const [splodoLink, setSplodoLink] = useState()

  useEffect(() => {

    let foundFunction = false;


    if(props.onlyShow){

      props.tags.forEach((tag) => {
        if(tag.tagName == "url"){
          foundFunction = true;
          return
        }
       
      })



    }
   


    if(!foundFunction){

      if(props.onlyShow){
        setSplodoLink("/splodoshow");
      }
      else{
        setSplodoLink("/splodo");
      }

    }
   
  
 
  }, [])
  

  console.log(props.splodoId)
 console.log(props.iconUrl)
  return (
    <div onClick={onSplodoClick} className="IndividualSplodo browseItem">
      <Link className="Link" to={splodoLink} state={{ from: props.splodoId }}>
        <div className="folderContent">
          <div className="imageAndTitle">
            <img className="splodoIcon" src={props.iconUrl}></img>
            <h2>{props.title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
