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

export function createQueryFromKeyword(keyword) {
  if (keyword === "") {
    return keyword;
  }

  const escapeKeyword = keyword.trim().toLowerCase();
  const escapeKeywordWithUnderscore = escapeKeyword.replace(/ /g, "_");

  const query = `
  PREFIX lb: <http://lebon.netlify.com/>

  SELECT DISTINCT ?subject ?fullName
  WHERE {
    {
      ?subject ?predicate ?object .
      ?subject lb:gotLaureates ?object .
      ?subject lb:fullName ?fullName
      FILTER regex(lcase(str(?subject)), "${escapeKeywordWithUnderscore}") .
    }
  }
  `;

  return query;
}
