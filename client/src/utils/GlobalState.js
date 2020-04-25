import React, { createContext, useReducer, useContext } from "react";

import { CLEAR_ALL, LOADING, SET_CURRENT_USER, LOGGEDIN } from "./actions";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: {
          id: action.currentUser.id,
          username: action.currentUser.username,
          role: action.currentUser.role,
        },
      };
    case LOGGEDIN:
      return {
        ...state,
        loggedIn: true,
      };
    case CLEAR_ALL:
      return {
        currentUser: {
          id: 0,
          username: "",
          role: "",
        },
        loggedIn: false,
        loading: false,
      };

    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    currentUser: {
      id: 0,
      username: "",
      role: "",
    },
    loading: false,
    loggedIn: false,
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
