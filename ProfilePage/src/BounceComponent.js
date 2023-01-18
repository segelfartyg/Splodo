import React, {useEffect, useState} from 'react'
import "./BounceComponent.css"

export default function BounceComponent(props) {

    const [xPerc, setXPerc] = useState()
    const [yPerc, setYPerc] = useState()

    useEffect(() => {
      setXPerc(Math.random() * 65)
      setYPerc(Math.random() * 80)
    }, [])
    




  return (
    <div style={{"top": + yPerc +"vh", "left": + xPerc+"vw"}} className="bounceComponent" >
        <h2>{props.title}</h2>
        
        <h3>{props.desc}</h3>

    </div>
  )
}
