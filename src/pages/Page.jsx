import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { LebonContext } from "../context/LebonContext";
import SearchBar from "../components/SearchBar";
import PageResult from "../components/PageResult";

import "./Page.style.css";

function PagePage() {
  const { uri } = useParams();
  const { actions } = useContext(LebonContext);

  useEffect(() => {
    async function fetchData() {
      await actions.getDataFromURI(uri);
    }
    fetchData();
  }, [uri]);

  return (
    <div className="page-page">
      <SearchBar />
      <PageResult />
    </div>
  );
}

export default PagePage;
