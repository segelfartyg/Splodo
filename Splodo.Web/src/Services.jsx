import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Services() {
  return (
    <div>
      <div>Services</div>

      <Link to="/choosecat" state={{ from: "/bounce" }}>
        Bounce
      </Link>
    </div>
  );
}
