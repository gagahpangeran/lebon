import React from "react";
import useForm from "react-hook-form";
import { createQuery, useQuery } from "../utils/query";

export default function LandingPage() {
  const { handleSubmit, register } = useForm();
  const [{ data, isLoading, isError }, fetch] = useQuery(
    "https://fuseki.gagahpangeran.com/nobel/sparql"
  );

  const onSubmit = async values => {
    const query = createQuery(values.search);
    await fetch(query);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="search" ref={register} />
        <button type="submit">Search</button>
      </form>
      {isLoading && <div>Loading...</div>}
    </>
  );
}
