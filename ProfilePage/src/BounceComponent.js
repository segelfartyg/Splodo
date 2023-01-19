import React, { useEffect, useState, useRef } from "react";
import "./BounceComponent.css";

export default function BounceComponent(props) {
  const [xPerc, setXPerc] = useState(0);
  const [yPerc, setYPerc] = useState(0);
  const up = useRef();
  const right = useRef();
  var interval;
  useEffect(() => {
    setXPerc(Math.random() * 65);
    setYPerc(Math.random() * 80);

    up.current = getRandomInt(0, 2);
    right.current = getRandomInt(0, 2);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (xPerc >= 65) {
      right.current = 0;
    } else if (xPerc <= 0) {
      right.current = 1;
    }
  }, [xPerc]);

  useEffect(() => {
    if (yPerc >= 80) {
      up.current = 0;
    } else if (yPerc <= 1) {
      up.current = 1;
    }
  }, [yPerc]);

  useEffect(() => {
    if (props.bounceBool) {
      interval = setInterval(() => {

        let bounceMode = "jump";

        switch (bounceMode) {
          case "jump":
            if (right.current == 1) {
              setXPerc((prev) => prev + 0.25);
            } else if (right.current == 0) {
              setXPerc((prev) => prev - 0.25);
            }
            if (up.current == 1) {
              setYPerc((prev) => prev * 1.05);
            } else if (up.current == 0) {
              setYPerc((prev) => prev * 0.95);
            }

            break;

          case "sick":
            if (right.current == 1) {
              setXPerc((prev) => prev + 0.25);
            } else if (right.current == 0) {
              setXPerc((prev) => prev - 0.25);
            }
            if (up.current == 1) {
              setYPerc((prev) => prev + 0.25);
            } else if (up.current == 0) {
              setYPerc((prev) => prev - 0.25);
            }

            break;
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
  }, [props.bounceBool]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  return (
    <div
      style={{ top: +yPerc + "vh", left: +xPerc + "vw" }}
      className="bounceComponent"
    >
      <h2>{props.title}</h2>

      <h3>{props.desc}</h3>
    </div>
  );
}
