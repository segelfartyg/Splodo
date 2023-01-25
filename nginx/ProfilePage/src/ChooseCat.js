import React, {useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Config from "../Config"
import CategorySingleView from './CategorySingleView';

export default function ChooseCat(props) {


    const location = useLocation();
    // WHAT SERVICE TO USE FURTHER
    const { from } = location.state;

    const navigate = useNavigate();

  const [categories, setCategories] = useState([])
 




    useEffect(() => {
      GetCategories();
        //navigate("/bounce", {state: { from: "/bounce"}})
    }, [])
    
    function onCatClick(_catId){

      console.log(_catId)
    }

    
    function GetCategories(){
      fetch("/api/getCats", {
        credentials: "include",
      }).then((response) =>
        response.json().then((data) => {
          console.log(data.response);
  
          let temp = [];
          data.response.forEach((cat) =>{

         
              temp.push({
                  
                  title: cat.title,
                  catId: cat._id,
              })
          })
          setCategories(temp);
        })
      );
    }

    let catRender = categories.map((cat) => {
      return (

     

        <CategorySingleView
          key={cat._id}
          catId={cat.catId}
          catName={cat.title}
          onCatClick={onCatClick}
          service={from}
        ></CategorySingleView>

      );
    });

  return (
    <div>
             <h1>Choose Category</h1>
             {catRender}
    </div>
  )
}
