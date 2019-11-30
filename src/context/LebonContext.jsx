import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducers";
import { useActions } from "./actions";

const LebonContext = createContext(initialState);

const LebonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  console.log("ini state", state);

  return (
    <LebonContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </LebonContext.Provider>
  );
};

export { LebonContext, LebonProvider };
