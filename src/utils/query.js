import SparqlHttp from "sparql-http-client";
import fetch from "isomorphic-fetch";

export async function getQuery(url, query) {
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
