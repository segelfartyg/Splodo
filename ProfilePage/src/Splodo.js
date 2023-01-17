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


const newTagNameRef = useRef();
const newTagValueRef = useRef();

const splodoNameChangeRef = useRef();
const splodoDescChangeRef = useRef();

  const [tags, setTags] = useState([])


  const currentSplodoCat = useRef({value: "nocat", label: "No Category"});
  const [splodoNameChangeStyle, setSplodoNameChangeStyle] = useState({display: "none"})
  const [descNameChangeStyle, setDescNameChangeStyle] = useState({display: "none"})

  function removeEdit(){

    // if(splodoNameChangeStyle.display == "block"){
    //   setSplodoNameChangeStyle(prev => { return {...prev, display: "none"} })
    // }
   
    
    // setDescChangeStyle(prev => { return {...prev, display: "none"} })
  }

  function onSplodoNameChangePress(){
    console.log(splodoNameChangeStyle.display)
    if(splodoNameChangeStyle.display == "none"){
      setSplodoNameChangeStyle(prev => { return {...prev, display: "block"} })
    }else{
      // setSplodoNameChangeStyle(prev => {
      //   return {...prev, display: "none"}
      // })
    }


  }


  function onNewTag(){


    let temp = tags;
    let max = 0;
    temp.forEach((tag) => {

     if(tag.index >= max){
      max = tag.index
     }

    })

    max++

    
    temp.push({tagName: newTagNameRef.current.value, tagValue: newTagValueRef.current.value, index: max})


    setTags([...temp])
  
    console.log(tags)

  }

  let tagsRender = tags.map((tag) => {
    return (
      <p key={Math.random()}>{tag.tagName} : {tag.tagValue} <button className="tagRemoveBtn" onClick={() => onTagRemove(tag.index)}>REMOVE</button></p> 
    );
  });


  function onTagRemove(_index){

    let temp = tags;

    let newArr = removeObjectWithId(temp, _index)



    setTags([...newArr])
  }

  function removeObjectWithId(arr, index) {
    const objWithIdIndex = arr.findIndex((obj) => obj.index === index);
  
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
  
    return arr;
  }


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
          title: splodoNameChangeRef.current.value,
          desc: splodoDescChangeRef.current.value,
          // url: urlRef.current.value,
          tags: tags,
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


        if(data.response[0].tags){
          
          let temp = [];


          data.response[0].tags.forEach((tag) => {
            temp.push({tagName: tag.tagName, tagValue: tag.tagValue, index: tag.index})
            setTags([...temp])
          })
          

        }
        

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


    fetch(Config.SERVERURI + "/getTags?" + "splodoId=" + from, {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {
        // console.log(data.response[0]);

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
      <div className="card SplodoContainer" onClick={removeEdit}>

        <div className="wrapperCon">


        
        <input defaultValue={splodoShow.title} className="splodoTitle" ref={splodoNameChangeRef}></input>
        <textarea defaultValue={splodoShow.desc} className="splodoDescChange" ref={splodoDescChangeRef}></textarea>
       
        <Dropdown className="dropdown" menuClassName="dropdownList" options={options} onChange={onCatSelect} ref={currentSplodoCat} value={currentSplodoCat.current.label} placeholder={currentSplodoCat.current.label}></Dropdown>
     

        <div className="tagArea">

   
              
              <div className="newTagArea">
                <input className="tagName" ref={newTagNameRef} placeholder="Tag Name"></input><p className="divider">:</p>
                <input className="tagValue" ref={newTagValueRef} placeholder="Value"></input>
                <button id="newTagBtn"onClick={onNewTag}>Add</button>
              </div>
              
              {tagsRender}

            </div>
      
        <button className="saveSplodo" onClick={onSaveClick}>SAVE SPLODO</button>
        </div>
      </div>
    </div>
  );
}
