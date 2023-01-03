import React from 'react';
import "./New.css"

export default function New() {
  return (
    <div className="New">
        <div className="NewSplodoForm card">
                <input placeholder="Title"></input>
                <textarea></textarea>
                <input placeholder="Link / URL"></input>
                <button>Create Splodo</button>
        </div>
    </div>
  )
}
