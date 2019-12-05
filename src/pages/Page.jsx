import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { LebonContext } from "../context/LebonContext";
import SearchBar from "../components/SearchBar";

function PagePage() {
  const { uri } = useParams();
  const { state, actions } = useContext(LebonContext);

  useEffect(() => {
    async function fetchData() {
      await actions.getDataFromURI(uri);
    }
    fetchData();
  }, [uri]);

  return (
    <div className="page-page">
      <SearchBar />
    </div>
  );
}

export default PagePage;
