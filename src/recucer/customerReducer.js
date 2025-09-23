// Initial state for the customer data
export const initialState = {
  customers: [],
  filteredCustomers: [],
  search: "",
  segment: "all",
  statusFilter: "all",
  sortConfig: { key: "dateJoined", direction: "desc" },
};
// The reducer function to handle state changes
function customerReducer(state, action) {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
        filteredCustomers: action.payload,
      };
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_SEGMENT":
      return { ...state, segment: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_SORT_CONFIG":
      return { ...state, sortConfig: action.payload };
    case "SET_FILTERED_CUSTOMERS":
      return { ...state, filteredCustomers: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export default customerReducer;
