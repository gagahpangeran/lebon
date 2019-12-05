import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { LebonContext } from "../context/LebonContext";
import SearchBar from "../components/SearchBar";

import "./Page.style.css";

function PagePage() {
  const { uri } = useParams();
  const { state, actions } = useContext(LebonContext);

  useEffect(() => {
    async function fetchData() {
      await actions.getDataFromURI(uri);
    }
    fetchData();
  }, [uri]);

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
    <div className="page-page">
      <SearchBar />
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
    </div>
  );
}

export default PagePage;
