import { types } from "./reducers";
import { getQuery, createQuery } from "../utils/query";
import { serialize } from "../utils/serializer";

export const useActions = (state, dispatch) => {
  function setQuery(query) {
    dispatch({ type: types.SET_QUERY, payload: query });
  }

  async function getDataFromQuery(query) {
    if (query !== "") {
      dispatch({ type: types.SET_LOADING });
      const sparqlQuery = createQuery(query);

      try {
        const result = await getQuery(
          "https://fuseki.gagahpangeran.com/nobel/sparql",
          sparqlQuery
        );
        dispatch({ type: types.SET_DATA, payload: serialize(result) });
      } catch (e) {
        console.log(e);
        dispatch({ type: types.SET_ERROR });
      }
    }
  }

  return {
    setQuery,
    getDataFromQuery
  };
};
