import React, {useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ChooseCat(props) {


    const location = useLocation();
    // WHAT SERVICE TO USE FURTHER
    const { from } = location.state;

    const navigate = useNavigate();

   

    useEffect(() => {
        navigate("/bounce", {state: { from: "/bounce"}})
    }, [])
    

  return (
    <div>ChooseCat</div>
  )
}
