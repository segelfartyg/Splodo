import React, { useState, useEffect} from 'react'
import ProfilePicArea from './ProfilePicArea';
import BrowseArea from './BrowseArea';
import { Link } from 'react-router-dom';
import "./Profile.css"



export default function Profile() {

    const [chosenCat, setChosenCat] = useState(0)

    const [splodos, setSplodos] = useState([
        {
            catId: 1,
            catName: "Initiatives",
            splodos: [
                {
                    splodoId: 1,
                    title: "Splodo"
                },
                {
                    splodoId: 2,
                    title: "Charity"
                },
                {
                    splodoId: 3,
                    title: "NoteLad"
                }
            ]
        },
        {
            catId: 2,
            catName: "Good Books",
            splodos: [
                {
                    splodoId: 1,
                    title: "The Magician"
                },
                {
                    splodoId: 2,
                    title: "Bible"
                },
                {
                    splodoId: 3,
                    title: "Koran"
                }
            ]
        }
    ])

    function onNewFolderPress(){
        let temp = splodos;

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
          
        setSplodos(temp);
        setChosenCat(maxCatId + 1)
        console.log(maxCatId + 1)
    }
   


  return (
    <div className="Profile">

      
                        <ProfilePicArea />
                        <BrowseArea onNewFolderPress={onNewFolderPress} splodos={splodos} setChosenCat={setChosenCat} chosenCat={chosenCat}/>  
    </div>
  )
}
