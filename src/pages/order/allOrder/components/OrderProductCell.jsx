import { Eye } from "lucide-react";
import React, { useState } from "react";

export default function OrderProductCell({ products = [] }) {
  const [showAll, setShowAll] = useState(false);
  const first = products[0];

  if (!first) return <span className="text-sm text-gray-500">—</span>;

  return (
    <div className="flex items-center">
      <img
        src={first.image}
        alt={first.name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-md object-cover"
      />
      <div className="ml-3">
        <div className="text-sm font-medium text-gray-900">{first.name}</div>
        {products.length > 1 && (
          <button
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "কম দেখান" : `+${products.length - 1} আরও পণ্য দেখুন`}
            <Eye size={12} />
          </button>
        )}

        {showAll && (
          <ul className="mt-1 text-xs text-gray-700 list-disc pl-4 space-y-0.5">
            {products.slice(1).map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
