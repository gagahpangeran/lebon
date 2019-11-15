import React from "react";
import SparqlHttp from "sparql-http-client";
import fetch from "isomorphic-fetch";

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

export default function useQuery(url, query) {
  const [result, setResult] = React.useState({
    data: null,
    loading: true,
    error: false
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await getQuery(url, query);
        setResult({ data: res, loading: false, error: false });
      } catch {
        setResult({ data: null, loading: false, error: true });
      }
    }
    fetchData();
  }, [url, query]);

  return result;
}
