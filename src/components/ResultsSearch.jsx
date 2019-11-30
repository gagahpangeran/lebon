import React, { useContext } from "react";
import { LebonContext } from "../context/LebonContext";

const renderData = data => {
  return data.map(({ title, props }) => (
    <div key={title + props}>
      <h2>{title}</h2>
      <ul>
        {props.map(({ pred, obj }) => (
          <li key={pred + obj}>
            <strong>{pred}</strong> : <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  ));
};

function ResultsSearch() {
  const { state } = useContext(LebonContext);
  const { isLoading, isError, data } = state;

  if (isLoading || data === null) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data.length === 0) {
    return <div>Sorry, cant find it. Please try another keyword.</div>;
  }

  return <div>{renderData(data)}</div>;
}

export default ResultsSearch;
