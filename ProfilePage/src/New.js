import React, { useRef } from "react";
import "./New.css";
import Config from "../Config.js";

export default function New() {
  const titleRef = useRef();
  const descRef = useRef();
  const urlRef = useRef();

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
          catId: "nocat",
        }),
      });
      const content = await rawResponse.text();

      console.log(content);
    })();
  }

  return (
    <div className="New">
      <div className="NewSplodoForm card">
        <input ref={titleRef} placeholder="Title"></input>
        <textarea ref={descRef}></textarea>
        <input ref={urlRef} placeholder="Link / URL"></input>
        <button onClick={postSplodo}>Create Splodo</button>
      </div>
    </div>
  );
}
