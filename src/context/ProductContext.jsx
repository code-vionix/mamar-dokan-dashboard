import { createContext } from "react";
import { initialState } from "../recucer/productReducer.js";

// Create the ProductContext with the initial state
export const ProductContext = createContext(initialState);
