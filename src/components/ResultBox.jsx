import React from "react";
import { Link } from "react-router-dom";

function ResultBox({ name, url }) {
  return (
    <div className="lebon-result-link">
      <h2>
        <Link to={url}>{name}</Link>
      </h2>
    </div>
  );
}

export default ResultBox;
