import React, { useEffect, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { LebonContext } from "../context/LebonContext";
import SearchForm from "../components/SearchForm";
import ResultsSearch from "../components/ResultsSearch";

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
    <div>
      <SearchForm />
      <ResultsSearch />
    </div>
  );
}

export default SearchPage;
