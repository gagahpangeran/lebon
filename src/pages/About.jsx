import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import placeholder from "../images/placeholder.jpg";

import "./About.style.css";

const developers = [
  {
    name: "Gagah Pangeran Rosfatiputra",
    npm: "170639566"
  },
  {
    name: "Muhamad Abdurahman",
    npm: "1706040095"
  },
  {
    name: "Muhamad Achir Suci Ramadhan",
    npm: "1706979354"
  }
];

const renderDeveloper = data => {
  return data.map(({ name, npm }) => (
    <div key={npm} className="dev">
      <img src={placeholder} alt="mahasiswa" />
      <h4>{name}</h4>
      <h4>{npm}</h4>
    </div>
  ));
};

function AboutPage() {
  return (
    <div className="about-page">
      <h1>
        <Link to="/">Lebon</Link> by Querying With You
      </h1>
      <h3>Nobel Laureates Search Engine Using Semantic Web</h3>
      <img src={logo} alt="logo kami" />
      <h2>Developed by:</h2>
      <div className="lebon-developer">{renderDeveloper(developers)}</div>
      <div className="lebon-link">
        <a
          href="https://gitlab.com/querying-with-you/lebon"
          rel="noopener noreferrer"
          target="_blank"
        >
          Source Code
        </a>
        {" - "}
        <a
          href="https://www.cs.ui.ac.id/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Fasilkom UI
        </a>
        {" - "}
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default AboutPage;
