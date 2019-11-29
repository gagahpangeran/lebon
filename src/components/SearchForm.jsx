import React from "react";

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

function SearchForm({ register, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        ref={register}
        placeholder={randomName()}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
