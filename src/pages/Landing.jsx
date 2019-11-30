import React, { useEffect, useContext } from "react";
import { LebonContext } from "../context/LebonContext";
import SearchForm from "../components/SearchForm";

export default function LandingPage() {
  const { state, actions } = useContext(LebonContext);

  useEffect(() => {
    if (state.query !== "") {
      actions.setQuery("");
    }
  }, [state.query]);

  return (
    <div>
      <SearchForm />
    </div>
  );
}
