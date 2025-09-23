import { createContext } from "react";
import { initialState } from "../recucer/customerReducer";

// Create the context
export const CustomerContext = createContext(initialState);

// Create the provider component
