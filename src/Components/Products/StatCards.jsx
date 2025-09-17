import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import React from "react";
import InStockIconSvg from "../../svg/InStockIconSvg";
import OutOfStock from "../../svg/OutOfStock";
import TotalProductsIconSvg from "../../svg/TotalProductsIconSvg";
/**
 * A reusable component to display key product inventory statistics.
 */
const StatCards = ({ products }) => {
  /* Stat card calculation start */
  const totalProducts = products.length;

  const inStock = products.filter((p) => p.inStock).length;

  const lowStock = products.filter(
    (p) => p.quantity > 0 && p.quantity <= 5
  ).length;

  const outOfStock = products.filter((p) => !p.inStock).length;
  /* Stat card calculation end */

  /* Stat card value start */
  const stats = [
    {
      title: "সর্বমোট পণ্য",
      value: totalProducts,
      icon: <TotalProductsIconSvg />,
      bgColor: "bg-amber-100",
    },
    {
      title: "স্টক আছে",
      value: inStock,
      icon: <InStockIconSvg />,
      bgColor: "bg-green-100",
    },
    {
      title: "স্টক কম",
      value: lowStock,
      icon: <AlertCircle className="h-6 w-6 text-orange-600" />,
      bgColor: "bg-orange-100",
    },
    {
      title: "স্টক নেই",
      value: outOfStock,
      icon: <OutOfStock />,
      bgColor: "bg-red-100",
    },
  ];
  /* Stat card value end */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <motion.div
          key={stat.title}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div
              className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}
            >
              {stat.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
