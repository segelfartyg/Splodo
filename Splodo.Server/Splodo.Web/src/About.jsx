import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="About">
      <div className="infoArea card">
        <h1>What is Splodo?</h1>
        
        <p>
          Splodo is a platform made for creating value through text components that you
          create through a web interface.
        </p>

        <p>
          Even if Splodo can be used for anything, the fundamental purpose with
          the Splodo project is to celebrate and encourage great ideas. The
          long term goal of the project is to develop a community driven by these ideas. 
          The philosophy of Splodo is based on creativity and appriciation of innovation. This mainly in 
          a Software Development context.
        </p>

        <p>
          Furthermore, another fundemental part of Splodo is to create an open platform
          where everyone can create and utilize Splodos, to create value in other environments through
          the Splodo Backend API. At worst, Splodo is still a very open and fun way of showing off your
          social media links :P
        </p>

        <p>
          This project is made and maintained by Samuel Swarén, a Software Engineer located in 
          Uppsala, Sweden. 
        </p>
      </div>
    </div>
  );
}
