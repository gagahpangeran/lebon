import React from "react";
import useForm from "react-hook-form";
import { createQuery, useQuery } from "../utils/query";
import SearchForm from "../components/SearchForm";

export default function LandingPage() {
  const { handleSubmit, register } = useForm();
  const [{ data, isLoading, isError }, fetch] = useQuery(
    "https://fuseki.gagahpangeran.com/nobel/sparql"
  );

  const onSubmit = async values => {
    const query = createQuery(values.search);
    await fetch(query);
  };

  const renderData = data => {
    if (data.length === 0) {
      return <div>Sorry, cant find it. Please try another keyword.</div>;
    }

    return data.map(({ title, props }) => (
      <div key={title + props}>
        <h2>{title}</h2>
        <ul>
          {props.map(({ pred, obj }) => (
            <li key={pred + obj}>
              <strong>{pred}</strong> : <span>{obj}</span>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <>
      <SearchForm register={register} onSubmit={handleSubmit(onSubmit)} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error!</div>}
      {!isLoading && data && renderData(data)}
    </>
  );
}
