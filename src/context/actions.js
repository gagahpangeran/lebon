import { types } from "./reducers";
import {
  getQuery,
  createQueryFromKeyword,
  createQueryFromURI
} from "../utils/query";
import {
  serializeResultKeyword,
  serializeResultURI
} from "../utils/serializer";

export const useActions = (state, dispatch) => {
  function setQuery(query) {
    dispatch({ type: types.SET_QUERY, payload: query });
  }

  async function getDataFromQuery(query) {
    if (query !== "") {
      dispatch({ type: types.SET_LOADING });
      const sparqlQuery = createQueryFromKeyword(query);

      try {
        const result = await getQuery(
          "https://fuseki.gagahpangeran.com/nobel/sparql",
          sparqlQuery
        );
        dispatch({
          type: types.SET_DATA,
          payload: serializeResultKeyword(result)
        });
      } catch (e) {
        console.log(e);
        dispatch({ type: types.SET_ERROR });
      }
    }
  }

  async function getDataFromURI(uri) {
    dispatch({ type: types.SET_LOADING });
    const sparqlQuery = createQueryFromURI(uri);

    try {
      const result = await getQuery(
        "https://fuseki.gagahpangeran.com/nobel/sparql",
        sparqlQuery
      );
      dispatch({
        type: types.SET_DATA_PAGE,
        payload: serializeResultURI(result)
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: types.SET_ERROR });
    }
  }

  return {
    setQuery,
    getDataFromQuery,
    getDataFromURI
  };
};
