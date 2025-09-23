import { useEffect, useState } from "react";
import { CUSTOMERS_DATA } from "../../data/customesData";
import { useCustomers } from "../../hooks/useCustomers";
import { useCustomersLogic } from "../../hooks/useCustomersLogic";
import Pagination from "../Common/Pagination";
import { Card } from "../Ui/Card";
import { CustomerFilters } from "./CustomerFilters";
import { CustomersHeader } from "./CustomersHeader";
import { CustomersTable } from "./CustomersTable";

function CustomersPageContent() {
  const { state, dispatch } = useCustomers();
  const { filteredCustomers, handleSort, sortConfig } = useCustomersLogic();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust this number

  // Calculate pagination values
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  // Pagination handlers with logical checks
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [state.search, state.segment, state.statusFilter, state.sortConfig]);

  // Load initial data (mimicking an API call)
  useEffect(() => {
    dispatch({ type: "SET_CUSTOMERS", payload: CUSTOMERS_DATA });
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <CustomersHeader />
      <Card>
        <CustomerFilters />
        <CustomersTable
          customers={currentCustomers}
          sortConfig={sortConfig}
          handleSort={handleSort}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
          indexOfFirstItem={indexOfFirstItem}
          indexOfLastItem={indexOfLastItem}
          totalItems={filteredCustomers.length}
        />
      </Card>
    </div>
  );
}
export default CustomersPageContent;
