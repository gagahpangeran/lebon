import React from "react";
import SparqlHttp from "sparql-http-client";
import fetch from "isomorphic-fetch";
import startCase from "lodash-es/startCase";

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
      try {
        const res = await getQuery(url, query);
        setData(res);
      } catch {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [url, query]);

  return [{ data, isLoading, isError }, setQuery];
}

export function createQuery(keyword) {
  const escapeKeyword = startCase(keyword.trim().toLowerCase()).replace(
    / /g,
    "_"
  );

  const query = `
  PREFIX ex: <http://example.org/>

  SELECT ?predicate ?object
  WHERE {
    ex:${escapeKeyword} ?predicate ?object
  }
  `;

  return query;
}
