import { Filter, Search } from "lucide-react";
import { useCustomers } from "../../hooks/useCustomers";
import { Button, Input, Select } from "../Ui/Ui";
export function CustomerFilters() {
  const { state, dispatch } = useCustomers();

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="গ্রাহক খুঁজুন..."
            className="pl-10"
            value={state.search}
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: e.target.value })
            }
          />
        </div>

        <div className="md:col-span-3">
          <Select
            value={state.segment}
            onChange={(e) =>
              dispatch({ type: "SET_SEGMENT", payload: e.target.value })
            }
          >
            <option value="all">সকল গ্রাহক সেগমেন্ট</option>
            <option value="vip">VIP গ্রাহক</option>
            <option value="loyal">লয়্যাল গ্রাহক</option>
            <option value="regular">রেগুলার গ্রাহক</option>
            <option value="new">নতুন গ্রাহক</option>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Select
            value={state.statusFilter}
            onChange={(e) =>
              dispatch({ type: "SET_STATUS_FILTER", payload: e.target.value })
            }
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="active">সক্রিয়</option>
            <option value="inactive">নিষ্ক্রিয়</option>
          </Select>
        </div>

        <div className="md:col-span-2 flex items-center justify-end">
          <Button variant="outline" className="w-full md:w-auto">
            <Filter size={16} className="mr-2" />
            ফিল্টার
          </Button>
        </div>
      </div>
    </div>
  );
}
