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
    console.log("hehe");
    const data = await endpoint.selectQuery(query);
    console.log("huhu");
    const obj = await data.json();
    return obj.results.bindings;
  } catch (e) {
    throw e;
  }
}

export function useQuery(url) {
  const [result, setResult] = React.useState({
    data: null,
    loading: false,
    error: false
  });

  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await getQuery(url, query);
  //       setResult({ data: res, loading: false, error: false });
  //     } catch {
  //       setResult({ data: null, loading: false, error: true });
  //     }
  //   }
  //   fetchData();
  // }, [url, query]);

  const fetchData = async query => {
    console.log("kepanggil");
    setResult(prevState => ({ ...prevState, loading: true }));
    try {
      console.log("hehe");
      const res = await getQuery(url, query);
      console.log(res);
      setResult({ data: res, loading: false, error: false });
    } catch {
      setResult({ data: null, loading: false, error: true });
    }
  };

  return [result, fetchData];
}

export function createQuery(keyword) {
  const escapeKeyword = startCase(keyword.trim().toLowerCase()).replace(
    / /g,
    "_"
  );

  const query = `
  SELECT ?predicate ?object
  WHERE {
    http://example.org/${escapeKeyword} ?predicate ?object
  }
  `;

  return query;
}
