import React from "react";
import { Link } from "react-router-dom";

import "./ResultBox.style.css";

function ResultBox({ name, url, field, motivation }) {
  return (
    <div className="lebon-result-link">
      <h2>
        <Link to={url}>{name}</Link>
      </h2>
      <ul>
        <li>
          <strong>Field : </strong> <span>{field}</span>
        </li>
        <li>
          <strong>Motivation : </strong> <span>{motivation}</span>
        </li>
      </ul>
    </div>
  );
}

export default ResultBox;
