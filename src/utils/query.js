import React from "react";
import SparqlHttp from "sparql-http-client";
import fetch from "isomorphic-fetch";
import { serialize } from "./serializer";

async function getQuery(url, query) {
  SparqlHttp.fetch = fetch;

  const endpoint = new SparqlHttp({
    endpointUrl: url
  });

  try {
    const data = await endpoint.selectQuery(query);
    const obj = await data.json();
    return obj.results.bindings;
  } catch (e) {
    throw e;
  }
}

export function useQuery(url) {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await getQuery(url, query);
        setData(serialize(res));
      } catch (e) {
        console.log(e);
        setIsError(true);
        setData(null);
      }
      setIsLoading(false);
    }

    if (query !== "") {
      fetchData();
    }
  }, [url, query]);

  return [{ data, isLoading, isError }, setQuery];
}

export function createQuery(keyword) {
  if (keyword === "") {
    return keyword;
  }

  const escapeKeyword = keyword.trim().toLowerCase();
  const escapeKeywordWithUnderscore = escapeKeyword.replace(/ /g, "_");

  const query = `
  PREFIX lb: <http://lebon.netlify.com/>

  SELECT DISTINCT ?subject ?predicate ?object
  WHERE {
    {
      ?subject ?predicate ?object .
      FILTER regex(lcase(str(?subject)), "${escapeKeywordWithUnderscore}") .
    }
    UNION
    {
      ?subject ?predicate ?object .
      FILTER (regex(lcase(str(?object)), "${escapeKeyword}") && regex(str(?predicate), str(lb:fullName))).
    }
  }
  `;

  return query;
}
