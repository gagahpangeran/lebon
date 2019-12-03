import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { LebonContext } from "../context/LebonContext";
import SearchBar from "../components/SearchBar";
import ResultsSearch from "../components/ResultsSearch";

import "./Search.style.css";

function SearchPage() {
  const { actions } = useContext(LebonContext);
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    if (query === null) {
      history.push("/");
      return;
    }

    async function fetchData() {
      await actions.setQuery(query);
      await actions.getDataFromQuery(query);
    }

    fetchData();
  }, [query]);

  return (
    <div className="search-page">
      <SearchBar />
      <ResultsSearch />
    </div>
  );
}

export default SearchPage;
