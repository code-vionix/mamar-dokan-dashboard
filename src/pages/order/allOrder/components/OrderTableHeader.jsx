export default function OrderTableHeader() {
  const headers = [
    "অর্ডার নং",
    "তারিখ",
    "গ্রাহক",
    "পণ্য",
    "পরিমান",
    "মূল্য",
    "পেমেন্ট",
    "স্ট্যাটাস",
    "অ্যাকশন",
  ];

  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((h) => (
          <th
            key={h}
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}
