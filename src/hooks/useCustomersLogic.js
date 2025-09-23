// hooks/useCustomersLogic.js
import { useEffect } from "react";
import { useCustomers } from "./useCustomers";

export const useCustomersLogic = () => {
  const { state, dispatch } = useCustomers();
  const { customers, search, segment, statusFilter, sortConfig } = state;

  useEffect(() => {
    let result = [...customers];

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchLower) ||
          customer.email.toLowerCase().includes(searchLower) ||
          customer.phone.toLowerCase().includes(searchLower) ||
          customer.id.toLowerCase().includes(searchLower)
      );
    }

    // Filter by segment
    if (segment !== "all") {
      result = result.filter((customer) => customer.segment === segment);
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((customer) => customer.status === statusFilter);
    }

    // Sort results
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    dispatch({ type: "SET_FILTERED_CUSTOMERS", payload: result });
  }, [customers, search, segment, statusFilter, sortConfig, dispatch]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    dispatch({ type: "SET_SORT_CONFIG", payload: { key, direction } });
  };

  return {
    handleSort,
    filteredCustomers: state.filteredCustomers,
    sortConfig: state.sortConfig, // Expose sortConfig for the component to use
  };
};
