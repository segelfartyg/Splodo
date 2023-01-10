import React, { useState, useEffect } from "react";
import ProfilePicArea from "./ProfilePicArea";
import BrowseArea from "./BrowseArea";
import { Link } from "react-router-dom";
import "./Profile.css";
import Config from "../Config.js";
import axios from "axios";

export default function Profile() {
  const [chosenCat, setChosenCat] = useState(0);

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
  const [splodos, setSplodos] = useState([]);

  function onNewFolderPress() {
    let temp = cats;

        // GET REQUEST TO SERVER, GETTING THE SPLODOS WITH SPECIFIED CATEGORY, ALL CATEGORIES, AND ALSO CATEGORIES WHICH ARE EMPTY
        axios
          .get(Config.SERVERURI + "/addCollection", { withCredentials: true })
          .then((res) => {
            console.log(res);
    
            // CHECKING AUTHENTICATION
            if (res.data.response != "noauth") {
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
                let cat = resultCats.find(({ catId }) => catId === splodo.catId);
                if (cat != undefined) {
                  console.log("SPLODOD", cat.catId);
                  cat.splodos.push({
                    splodoId: splodo.splodoId,
                    title: splodo.title,
                  });
                  console.log(splodo.splodoId);
                  console.log(cat);
    
                  // EVERY ITERATION, CHECKS IF CATEGORIES ARE PRESENT, IF NOT, ITS ADDED TO THE EMPTYCATEGORIES ARRAY
                  // NOT USED NOW THOUGH
                  if (
                    emptyCategories.find(({ catId }) => catId === cat.catId) !=
                    undefined
                  ) {
                    let newEmptyCategories = emptyCategories.filter(function (obj) {
                      return obj.catId !== cat.catId;
                    });
    
                    emptyCategories = newEmptyCategories;
                  }
                } else {
                  console.log("NO CATEGORY EXIST WITH THAT SPLODO: ERROR ");
                }
              });
    
              // ADDING ALL SPLODOS THAT DOESNT HAVE AN ASSIGNED CATEGORY
    
              res.data.response.splodosWithoutCat.forEach((item) => {
                profileSplodos.push({
                  splodoId: item.splodoId,
                  title: item.title,
                  catId: item.catId,
                });
              });
    
              console.log(emptyCategories);
              console.log(resultCats);
              console.log(profileSplodos);
    
              // SETTING STATE FOR CATEGORIES AND SPLODOS WITHOUT CATEGORY
              setCats(resultCats);
              setSplodos(profileSplodos);
            } else {
              console.log("not authenticated");
            }
          });
    
  }

  // useEffect(() => {

  //     console.log(Config);

  //     fetch("http://localhost:3000/profile", {credentials: "include"})
  //     .then((response) => response.text()
  //     .then ((data) => console.log(data)))
  // }, [])

  useEffect(() => {
    // GET REQUEST TO SERVER, GETTING THE SPLODOS WITH SPECIFIED CATEGORY, ALL CATEGORIES, AND ALSO CATEGORIES WHICH ARE EMPTY
    axios
      .get(Config.SERVERURI + "/profile", { withCredentials: true })
      .then((res) => {
        console.log(res);

        // CHECKING AUTHENTICATION
        if (res.data.response != "noauth") {
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
              console.log("SPLODOD", cat._id);
              cat.splodos.push({
                splodoId: splodo.splodoId,
                title: splodo.title,
              });
              console.log(splodo.splodoId);
              console.log(cat);

              // EVERY ITERATION, CHECKS IF CATEGORIES ARE PRESENT, IF NOT, ITS ADDED TO THE EMPTYCATEGORIES ARRAY
              // NOT USED NOW THOUGH
              if (
                emptyCategories.find(({ _id}) => _id === cat._id) !=
                undefined
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
            profileSplodos.push({
              splodoId: item.splodoId,
              title: item.title,
              catId: item.catId,
            });
          });

          console.log(emptyCategories);
          console.log(resultCats);
          console.log(profileSplodos);

          // SETTING STATE FOR CATEGORIES AND SPLODOS WITHOUT CATEGORY
          setCats(resultCats);
          setSplodos(profileSplodos);
        } else {
          console.log("not authenticated");
        }
      });
  }, []);

  return (
    <div className="Profile">
      <ProfilePicArea />
      <BrowseArea
        onNewFolderPress={onNewFolderPress}
        cats={cats}
        splodos={splodos}
        setChosenCat={setChosenCat}
        chosenCat={chosenCat}
      />
    </div>
  );
}
