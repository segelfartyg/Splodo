import React, {useState} from 'react'
import SplodoListItem from './SplodoListItem';

export default function (props) {


    const [arrowStyle, setArrowStyle] = useState({animation: "none"})
    const [childrenHide, setChildrenHide] = useState(false)

    function onCatClick(catId){
       
        props.onCatClick(props.catId);

        if(childrenHide){
            setChildrenHide(false)
            setArrowStyle(prev => {
              return {...prev, animation: "arrowRotateDown 0.5s forwards" }
          });
        }
        else{
            setChildrenHide(true)
            setArrowStyle(prev => {
              return {...prev, animation: "arrowRotateUp 0.5s forwards" }
          });
        }
    }

  return (
    <div className="containerCatSplodo">
        <div onClick={() => onCatClick(props.catId)} className="browseItem">
        <div className="folderContent">
            <div className="imageAndTitle">
                <img className="splodoIcon" src="./folder.png"></img>
                <h2>{props.catName}</h2>
            </div>
            <h3 style={arrowStyle}>v</h3>
        </div>

      

    </div>

    <div className="splodoListItemArea">


   
  {props.cats.map((cat) => (

    
    <SplodoListItem key={props.catId + "_" + cat.splodoId}catId={props.catId} title={cat.title} splodoId={cat.splodoId} chosenCat={props.chosenCat} childrenHide={childrenHide}></SplodoListItem>
  

))}
  </div>
</div>
  )
}
