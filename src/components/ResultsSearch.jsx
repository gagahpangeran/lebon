import React, { useContext } from "react";
import { LebonContext } from "../context/LebonContext";

import "./ResultSearch.style.css";

const renderData = data => {
  return data.map(({ url, name }) => (
    <div key={url + name} className="lebon-result-link">
      <h2>{name}</h2>
    </div>
  ));
};

function ResultsSearch() {
  const { state } = useContext(LebonContext);
  const { isLoading, isError, data } = state;

  if (isError) {
    return <h3>Error! Sorry, there's something wrong :(</h3>;
  }

  if (isLoading || data === null) {
    return <h3>Loading...</h3>;
  }

  if (data.length === 0) {
    return <h3>Sorry, cant find it. Please try another keyword.</h3>;
  }

  return <div className="lebon-results">{renderData(data)}</div>;
}

export default ResultsSearch;
