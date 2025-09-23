import { Download, PlusCircle } from "lucide-react";
import { Button, Heading } from "../Ui/Ui";

export function CustomersHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <Heading>গ্রাহক ব্যবস্থাপনা</Heading>
        <p className="text-gray-500 mt-1">Customers Management</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" title="Export customers">
          <Download size={18} />
        </Button>
        <Button>
          <PlusCircle size={18} className="mr-2" />
          নতুন গ্রাহক <span className="hidden md:inline ml-1">যোগ করুন</span>
        </Button>
      </div>
    </div>
  );
}
