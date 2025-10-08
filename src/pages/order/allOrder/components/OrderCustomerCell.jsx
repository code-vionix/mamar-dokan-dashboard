export default function OrderCustomerCell({ customer }) {
  return (
    <div className="flex items-center">
      {customer?.avatar ? (
        <img
          src={customer.avatar}
          alt={customer.name}
          className="h-8 w-8 rounded-full object-cover mr-3"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center mr-3">
          <span className="text-amber-700 font-medium">
            {(customer?.name || "U").charAt(0)}
          </span>
        </div>
      )}
      <div>
        <div className="text-sm font-medium text-gray-900">
          {customer?.name}
        </div>
        <div className="text-xs text-gray-500">{customer?.email}</div>
      </div>
    </div>
  );
}
