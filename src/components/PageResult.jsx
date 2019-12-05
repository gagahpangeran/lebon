import React, { useContext } from "react";
import { LebonContext } from "../context/LebonContext";

import "./PageResult.style.css";

function PageResult() {
  const { state } = useContext(LebonContext);
  const { isLoading, isError, dataPage } = state;

  if (isError) {
    return <h3>Error! Sorry, there's something wrong :(</h3>;
  }

  if (isLoading || dataPage === null) {
    return <h3>Loading...</h3>;
  }

  if (dataPage.length === 0) {
    return <h3>Sorry, cant find it. Please try another keyword.</h3>;
  }

  return (
    <div className="page-result">
      <h1>{dataPage.name}</h1>
      {dataPage.thumbnail && (
        <img src={dataPage.thumbnail} alt={dataPage.name} />
      )}
      <ul>
        {dataPage.data.map(({ pred, obj }) => (
          <li key={pred}>
            <strong>{pred} : </strong> <span>{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PageResult;
