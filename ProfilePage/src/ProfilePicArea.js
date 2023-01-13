import React, {useState, useEffect, useRef} from "react";
import "./ProfilePicArea.css";
import Config from "../Config"

export default function ProfilePicArea(props) {

  
  const [profileColor, setProfileColor] = useState({ background: `linear-gradient(120deg,rgb(190, 0, 0) 0%,rgb(160, 0, 0) 50%,rgb(130, 0, 0) 100%`});
  const [roleColor, setRoleColor] = useState({color: `rgb(190, 0, 0)`})
  const nameChangeRef = useRef();
 

  const [nameChangeStyle, setNameChangeStyle] = useState({display: "none"})


  useEffect(() => {
    console.log(props.userInfo.role)
    switch(props.userInfo.role){
      
        case "Traveller":
          setProfileColor(prev => {
          return { ...prev, background: `linear-gradient(120deg,#2f9d1e 0%,#29d637 50%,#2f9d1e 100%`} 
          })

          setRoleColor(prev => {
            return { ...prev, color: `#2f9d1e`} 
        })
          break;
        case "Kosmos":
          setProfileColor(prev => {
            return { ...prev, background: `linear-gradient(120deg,#347ccb 0%,#233bdc 50%,#3617e8 100%`} 
          })

          setRoleColor(prev => {
            return { ...prev, color: `#347ccb`} 
        })
        break;
        case "Satellit":
          setProfileColor(prev => {
            return { ...prev, background: `linear-gradient(120deg, #cfa930 0%,#d49e2b 50%,#da8b25 100%`} 
          })

          setRoleColor(prev => {
            return { ...prev, color: `#cfa930`} 
        })
            break;
            case "Admin":
              setProfileColor(prev => {
                return { ...prev, background: `linear-gradient(120deg,rgb(190, 0, 0) 0%,rgb(160, 0, 0) 50%,rgb(130, 0, 0) 100%`} 
              })

              setRoleColor(prev => {
                return { ...prev, color: `rgb(190, 0, 0)`} 
            })
                break;
        

    }




  }, [props.userInfo])
  

  function onChangeNameClick(){

    if(nameChangeStyle.display == "none"){
      setNameChangeStyle(prev => { return {...prev, display: "block"} })
    }


  }


  function onChangeNameSubmit(){

      setNameChangeStyle(prev => { return {...prev, display: "none"} })
 
      if(nameChangeRef.current.value.length >= 1){

     
        (async () => {
          const rawResponse = await fetch(Config.SERVERURI + "/nameChange", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: nameChangeRef.current.value,
          
            }),
          });
          const content = await rawResponse.text();
          props.onNameChange(content)
          console.log(content);
        })();



      }
  }


  return (
    <div className="profilePicArea">
      <div className="profileDetails">
        <h2 onClick={onChangeNameClick} className="profileName">{props.userInfo.splodoName}
        <input className="nameChange" ref={nameChangeRef} style={nameChangeStyle}></input><button onClick={onChangeNameSubmit} style={nameChangeStyle} className="saveNameBtn">SAVE NAME</button></h2>
        <h3 className="role" style={roleColor}>{props.userInfo.role}</h3>
        <h3 className="profileURL">
          <a>www.github.com/segelfartyg</a>
        </h3>
      </div>

      <div className="imageDiv">
        <img src="./segelfartyg.png" className="profilePic"></img>

        <div className="roleStatus" style={profileColor}></div>
      </div>
    </div>
  );
}
