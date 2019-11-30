import React, { useContext, useState, useEffect } from "react";
import useForm from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LebonContext } from "../context/LebonContext";
import { Link } from "react-router-dom";

const randomName = () => {
  const names = [
    "Albert Einstein",
    "Marie Curie",
    "Mother Teresa",
    "Robert Koch",
    "Max Planck"
  ];

  return names[Math.floor(Math.random() * names.length)];
};

function SearchForm() {
  const { state } = useContext(LebonContext);
  const [value, setValue] = useState(state.query);
  const { handleSubmit, register } = useForm();
  const history = useHistory();

  const onSubmit = async values => {
    history.push(`/search?q=${values.q}`);
  };

  useEffect(() => {
    setValue(state.query);
  }, [state.query]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        value={value}
        name="q"
        ref={register}
        placeholder={randomName()}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
      <Link to="/">Home</Link>
    </form>
  );
}

export default SearchForm;
