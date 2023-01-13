import React, { useRef, useState } from "react";
import "./New.css";
import Config from "../Config.js";

export default function New() {

  const titleRef = useRef();
  const descRef = useRef();
  const urlRef = useRef();

  const newTagNameRef = useRef();
  const newTagValueRef = useRef();

  const [tags, setTags] = useState([])

  function postSplodo() {
    (async () => {
      const rawResponse = await fetch(Config.SERVERURI + "/new", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: titleRef.current.value,
          desc: descRef.current.value,
          url: urlRef.current.value,
          tags: tags,
          catId: "nocat",
        }),
      });
      const content = await rawResponse.text();

      console.log(content);
    })();
  }

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

  return (
    <div className="New">
      <div className="NewSplodoForm card">
        <input className="inputHeader" ref={titleRef} placeholder="Title"></input>
        <textarea className="inputDesc" ref={descRef}></textarea>
         <input ref={urlRef} className="inputUrl" placeholder="Link / URL"></input> 
        <div className="tagArea">

            <div className="tagArea">

   
              
              <div className="newTagArea">
                <input className="tagName" ref={newTagNameRef} placeholder="Tag Name"></input><p className="divider">:</p>
                <input className="tagValue" ref={newTagValueRef} placeholder="Value"></input>
                <button id="newTagBtn"onClick={onNewTag}>Add</button>
              </div>
              
              {tagsRender}

            </div>


        </div>
     
        <button className="submitBtn" onClick={postSplodo}>Create Splodo</button>
      </div>
    </div>
  );
}
