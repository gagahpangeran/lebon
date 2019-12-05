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

export function createQueryFromURI(uri) {
  const query = `
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX dbo: <http://dbpedia.org/ontology/>
  PREFIX dbp: <http://dbpedia.org/property/>
  PREFIX dct: <http://purl.org/dc/terms/>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  SELECT DISTINCT ?p ?o
  WHERE {
	{
		SELECT DISTINCT ?p ?o
		WHERE {
			SERVICE <http://fuseki.gagahpangeran.com/nobel/sparql>
			{
				SELECT DISTINCT ?same 
				WHERE {
					?s ?p ?o .
					?s owl:sameAs ?same .
					FILTER (<http://lebon.netlify.com/${uri}> = ?s)
				}
			} .
			SERVICE <http://dbpedia.org/sparql>
			{
        {
                ?same ?p1 ?o1 .
                FILTER(?p1 = dbo:award
                    || ?p1 = dbo:knownFor
                    || ?p1 = dbp:workplaces
                    || ?p1 = dct:description
                ) .
                ?p1 rdfs:label ?p .
                FILTER(lang(?p) = 'en') .
                ?o1 rdfs:label ?o .
                FILTER(lang(?o) = 'en') .
        }
        UNION
        {
            ?same dbo:thumbnail ?o .
            ?same ?p1 ?o .
            ?p1 rdfs:label ?p .
                FILTER(lang(?p) = 'en') .
        }
			} .
		}
	}
	UNION
	{
		SELECT DISTINCT ?p ?o 
		WHERE {
			?s ?p ?o .
			?s owl:sameAs ?same .
			FILTER (<http://lebon.netlify.com/Albert_Einstein> = ?s)
		}
	}
  }
  `;

  return query;
}
