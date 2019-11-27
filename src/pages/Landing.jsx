import React from "react";
import useForm from "react-hook-form";
import { createQuery, useQuery } from "../utils/query";

export default function LandingPage() {
  const { handleSubmit, register } = useForm();
  const [data, fetch] = useQuery(
    "https://fuseki.gagahpangeran.com/nobel/sparql"
  );

  const onSubmit = async values => {
    const query = createQuery(values.search);
    console.log(query);
    console.log("sebelum", data);
    await fetch(query);
    console.log("sesudah", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" name="search" ref={register} />
      <button type="submit">Search</button>
    </form>
  );
}
