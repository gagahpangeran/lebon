import React from "react";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

import "./SearchBar.style.css";

function SearchBar() {
  return (
    <nav className="lebon-searchbar">
      <h4>
        <Link to="/">Lebon</Link>
      </h4>
      <SearchForm />
    </nav>
  );
}

export default SearchBar;
