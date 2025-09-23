import { useReducer } from "react";
import { CustomerContext } from "../context/CustomerContext";
import customerReducer, { initialState } from "../recucer/customerReducer";

export function CustomerProvider({ children }) {
  const [state, dispatch] = useReducer(customerReducer, initialState);

  return (
    <CustomerContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
}
