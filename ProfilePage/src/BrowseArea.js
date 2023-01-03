import React, { useState } from 'react';
import "./BrowseArea.css"
import SplodoListItem from './SplodoListItem';
import Category from './Category';
import { Link } from 'react-router-dom';

export default function BrowseArea(props) {

    console.log(props.splodos)

   const [chosenCat, setChosenCat] = useState(0)

    function onCatClick(catid){
        console.log(catid)

        props.setChosenCat(catid)
        
      
    }
   

    function onNewFolderPress(){
        props.onNewFolderPress()
    }

    props.splodos.forEach((cat) =>{
        console.log(cat.catId)
    })

    let splodosRender =  props.splodos.map((cat) => {
       return <Category key={cat.catId} catId={cat.catId} catName={cat.catName} splodos={cat.splodos} onCatClick={onCatClick} chosenCat={props.chosenCat}></Category>    
    }

     
    

      
    )





  return (
    <div className="browseArea">

        {splodosRender}


    <div>
        
        <button onClick={onNewFolderPress}>Add Folder</button>


    </div>
    </div>

/* 
    <div className="browseItem">
        <div className='browseItemContainer'>
            <h2>😜</h2>
            <p>Lorem</p>
        </div>    
    </div>  

    <div className="browseItem">
        <div className='browseItemContainer'>
            <h2>👏</h2>
            <p>Lorem</p>
        </div>    
    </div>  

    <div className="browseItem">
        <div className='browseItemContainer'>
            <h2>🐱</h2>
            <p>Lorem</p>
        </div>    
    </div>  

    <div className="browseItem">
        <div className='browseItemContainer'>
            <h2>🚜</h2>
            <p>Lorem</p>
        </div>    
    </div>  

    <div className="browseItem">
        <div className='browseItemContainer'>
            <h2>🚜</h2>
            <p>Lorem</p>
        </div>    
    </div>  

    <div className="browseItem">
        <div className='browseItemContainer'>
            <h2>😎</h2>
            <p>Lorem</p>
        </div>    
    </div>  
 */





  )

}