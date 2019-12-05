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

  const modifiedKeyword = `.*${keyword
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, ".*")}.*`;

  const query = `
  PREFIX lb: <http://lebon.netlify.com/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  
  SELECT DISTINCT ?subject ?fullName ?motivation ?field
  WHERE {
    FILTER regex(lcase(str(?fullName)), "${modifiedKeyword}") .
    {
      ?subject lb:fullName ?fullName .
    }
    OPTIONAL
    {
      ?subject lb:gotLaureates/lb:motivation ?motivation .
    }
    OPTIONAL
    {
    ?subject lb:gotLaureates/lb:hasNobelCategory/rdfs:label ?field .
    }
  }
  `;

  return query;
}
