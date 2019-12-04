import React, { useContext } from "react";
import ResultBox from "./ResultBox";
import { LebonContext } from "../context/LebonContext";

import "./ResultsSearch.style.css";

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

  return (
    <div className="lebon-results">
      {data.map(data => (
        <ResultBox key={data.name} {...data} />
      ))}
    </div>
  );
}

export default ResultsSearch;
