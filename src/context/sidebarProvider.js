import React, { createContext, useContext, useMemo, useReducer } from "react";

const SidebarContext = createContext(null);

export function useSideBar() {
  return useContext(SidebarContext);
}

function reducer(state, action) {
  switch (action.type) {

    case "GET_SIDEBAR_LIST":
      return { ...state, listInfo : action.payload };

      case "SET_LOGIN":
        return { ...state, needLogin : action.payload };

    default:
      return state;
  }
}

export default function SidebarContextProvider({ children }) {
  const initialState = {
    listInfo : null,
    needLogin : null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const SideBarList = useMemo(
    () => ({
      listInfo: state.listInfo,
      setlistInfo: (payload) => 
        dispatch({ type: "GET_SIDEBAR_LIST", payload }),
    }),
    [state.listInfo] 
  );

  const Login = useMemo(
    () => ({
      needLogin: state.needLogin,
      setneedLogin: (payload) => 
        dispatch({ type: "SET_LOGIN", payload }),
    }),
    [state.needLogin] 
  );

  
  return (
    <SidebarContext.Provider value={{SideBarList, Login}}>
      {children}
    </SidebarContext.Provider>  
  );
}
