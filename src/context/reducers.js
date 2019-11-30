const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  query: ""
};

const types = {
  SET_QUERY: "SET_QUERY",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  SET_DATA: "CHANGE_DATA"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case types.SET_LOADING:
      return {
        ...state,
        isError: false,
        isLoading: true
      };
    case types.SET_ERROR:
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: true
      };
    case types.SET_DATA:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false
      };
    default:
      return state;
  }
};

export { initialState, types, reducer };
