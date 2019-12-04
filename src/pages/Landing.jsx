import React, { useEffect, useContext } from "react";
import { LebonContext } from "../context/LebonContext";
import SearchForm from "../components/SearchForm";

import "./Landing.style.css";

export default function LandingPage() {
  const { state, actions } = useContext(LebonContext);

  useEffect(() => {
    if (state.query !== "") {
      actions.setQuery("");
    }
  });

  return (
    <div className="landing-page">
      <h1>Lebon</h1>
      <SearchForm />
    </div>
  );
}
