import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ProfilePicArea from "./ProfilePicArea";
import BrowseArea from "./BrowseArea";
import axios from "axios";

export default function ShowProfile(props) {
  const [userInfo, setUserInfo] = useState({
    splodoName: "sname",
    role: "role",
    userId: "1",
  });
  const navigate = useNavigate();
  const [splodos, setSplodos] = useState([]);
  const [cats, setCats] = useState([
    {
      catId: 1,
      catName: 1,
      splodos: [
        {
          splodoId: 1,
          title: "Lorem",
        },
        {
          splodoId: 2,
          title: "Ipsum",
        },
        {
          splodoId: 3,
          title: "Example",
        },
      ],
    },
  ]);

  useEffect(() => {
    getProfileInformation();
    // GET REQUEST TO SERVER, GETTING THE SPLODOS WITH SPECIFIED CATEGORY, ALL CATEGORIES, AND ALSO CATEGORIES WHICH ARE EMPTY
    axios
      .get("/api/ProfileShow?splodoName=" + window.location.pathname, {
        withCredentials: true,
      })
      .then((res) => {
    

        // CHECKING AUTHENTICATION
        if (res.data != "nouser") {
          let resultSplodosWithCat = res.data.response.splodosWithCat;
          let resultCats = res.data.response.categories;
          let emptyCategories = res.data.response.categories;

          let profileSplodos = [];
          let profileCats = [];
          let profileCatSplodos = [];

          // SORTING SPLODOS WITH CATEGORY
          resultSplodosWithCat.sort(function (a, b) {
            return parseFloat(a.catId) - parseFloat(b.catId);
          });

          // SORTING CATEGORIES BY CATID
          resultCats.sort(function (a, b) {
            return parseFloat(a.catId) - parseFloat(b.catId);
          });

          //FOREACH SPLODO WITH A SPECIFIED CATEGORY, FINDS THE CATEGORY BY THAT SPLODOS CATID, THEN ADDING THAT SPECIFIC SPLODO INSIDE THAT CATEGORY BASED OFF FOUND CATID.
          res.data.response.splodosWithCat.forEach((splodo) => {
            let cat = resultCats.find(({ _id }) => _id === splodo.catId);
            if (cat != undefined) {
            
         
              checkTags(splodo.title, splodo.tags)

              cat.splodos.push({
                splodoId: splodo.splodoId,
                title: splodo.title,
                tags: splodo.tags
              });
          

              // EVERY ITERATION, CHECKS IF CATEGORIES ARE PRESENT, IF NOT, ITS ADDED TO THE EMPTYCATEGORIES ARRAY
              // NOT USED NOW THOUGH
              if (
                emptyCategories.find(({ _id }) => _id === cat._id) != undefined
              ) {
                let newEmptyCategories = emptyCategories.filter(function (obj) {
                  return obj._id !== cat._id;
                });

                emptyCategories = newEmptyCategories;
              }
            } else {
              console.log("NO CATEGORY EXIST WITH THAT SPLODO: ERROR ");
            }
          });

          // ADDING ALL SPLODOS THAT DOESNT HAVE AN ASSIGNED CATEGORY

          res.data.response.splodosWithoutCat.forEach((item) => {

            checkTags(item.title, item.tags)

            profileSplodos.push({
              splodoId: item.splodoId,
              title: item.title,
              catId: item.catId,
              iconUrl: item.iconUrl,
              tags: item.tags
            });
          });


          // SETTING STATE FOR CATEGORIES AND SPLODOS WITHOUT CATEGORY
          setCats(resultCats);
          setSplodos(profileSplodos);
        } else {
          console.log("no user");
          navigate("/");
        }
      });







  }, []);


  function checkTags(title, tags){
 
    let stylingobject = {deg: "90deg", colors: []}

    if(title == "Styling"){
      console.log(tags)
      tags.forEach((tag) => {

        if(tag.tagName == "deg"){
          if(tag.tagValue >= 0){
              stylingobject.deg = tag.tagValue + "deg"
          }
          else{
            stylingobject.deg = "90deg"
          }
        }
        else if(tag.tagName.includes("c")){
          stylingobject.colors.push(tag.tagValue)
        }
      })
      props.changePageStyle(stylingobject)
   
    }   
  }

  function getProfileInformation() {
    fetch("/api/getProfileShow?splodoName=" + window.location.pathname, {
      credentials: "include",
    }).then((response) =>
      response.json().then((data) => {


        setUserInfo((prev) => {
          return {
            ...prev,
            splodoName: data[0].splodoName,
            role: data[0].role,
            userId: data[0].userId,
          };
        });
      })
    );
  }




  return (
    <div className="Profile">



    
      <ProfilePicArea userInfo={userInfo} onlyShow={true} />
      <BrowseArea cats={cats} splodos={splodos} onlyShow={true} />
  
    </div>
  );
}
