import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

import "./SearchBar.style.css";

function SearchBar() {
  return (
    <nav className="lebon-searchbar">
      <div className="search">
        <h4>
          <Link to="/">Lebon</Link>
        </h4>
        <SearchForm />
      </div>
      <div className="about">
        <h4>
          <Link to="/about">About</Link>
        </h4>
      </div>
    </nav>
  );
}

export default SearchBar;
