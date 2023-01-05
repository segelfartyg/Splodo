import React, { useState, useEffect} from 'react'
import ProfilePicArea from './ProfilePicArea';
import BrowseArea from './BrowseArea';
import { Link } from 'react-router-dom';
import "./Profile.css"
import Config from '../Config.js';
import axios from 'axios';



export default function Profile() {

    const [chosenCat, setChosenCat] = useState(0)

    const [cats, setCats] = useState([])
    const [splodos, setSplodos] = useState([])

    function onNewFolderPress(){
        let temp = cats;

        let maxCatId = Math.max(...temp.map(o => o.catId))


        temp.push(


            {
                catId: maxCatId + 1,
                catName: maxCatId + 1,
                splodos: [
                    {
                        splodoId: 1,
                        title: "Lorem"
                    },
                    {
                        splodoId: 2,
                        title: "Ipsum"
                    },
                    {
                        splodoId: 3,
                        title: "Example"
                    }
                ]
            }

        )
          
        setCats(temp);
        setChosenCat(maxCatId + 1)
        console.log(maxCatId + 1)
    }
   
    // useEffect(() => {

    //     console.log(Config);
        
    //     fetch("http://localhost:3000/profile", {credentials: "include"})
    //     .then((response) => response.text()
    //     .then ((data) => console.log(data)))
    // }, [])

    useEffect(() => {
        axios.get(Config.SERVERURI + "/profile", { withCredentials: true }).then((res) => {
            console.log(res);
            if(res.data.response != "noauth") {
                
                let profileSplodos = [];
                let profileCats = [];
                res.data.response.result.forEach((item) => {

                    if(item.catId != 0){

                        profileCats.push({
                                    catId: item.catId,
                                    catName: item.title,
                                    splodos: item.splodos
                                })

                    }
                    else{
                        profileSplodos.push({
                            splodoId: item.splodoId,
                            title: item.title

                        })
                    }

                })
                
                console.log(profileCats)
                console.log(profileSplodos)

                setCats(profileCats)
                setSplodos(profileSplodos)
            }
            else{
                console.log("not authenticated")
            }
        })
    }, [])

  return (
    <div className="Profile">
                        <ProfilePicArea />
                        <BrowseArea onNewFolderPress={onNewFolderPress} cats={cats} splodos={splodos} setChosenCat={setChosenCat} chosenCat={chosenCat}/>  
    </div>
  )
}
