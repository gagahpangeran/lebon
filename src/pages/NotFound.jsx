import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { LebonContext } from "../context/LebonContext";

import "./NotFound.style.css";

function NotFoundPage() {
  const { state, actions } = useContext(LebonContext);

  useEffect(() => {
    if (state.query !== "") {
      actions.setQuery("");
    }
  });

  return (
    <div className="not-found-page">
      <h1>404 Not Found</h1>
      <div className="link">
        You can <Link to="/">back to home</Link> or search bellow
      </div>
      <SearchForm />
    </div>
  );
}

export default NotFoundPage;
