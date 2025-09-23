import { CustomerProvider } from "../../provider/CustomerProvider";

// Sample customer data - will be replaced with actual API call
import CustomersPageContent from "../../Components/CustomersList/CustomersPageContent";

export default function CustomersPage() {
  return (
    <CustomerProvider>
      <CustomersPageContent />
    </CustomerProvider>
  );
}
