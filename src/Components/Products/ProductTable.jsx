import { AnimatePresence, motion } from "framer-motion";
import { Box, Edit, Eye, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  formatPrice,
  getCategoryBg,
  getStatusBg,
  getStatusText,
} from "../../utils/productUtils.js";
import StockModal from "../Modal/StockModal.jsx";
/* motion variants start */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};
/* motion variants end */
const ProductTable = ({
  currentProducts,
  selectedProducts,
  handleToggleSelectAll,
  handleToggleSelect,
  handleDeleteProducts,
  pageName,
}) => {
  /* sate manegment start */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  /* sate manegment end */
  /* handel fuction start */
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
  /* handel fuction end */

  return (
    <>
      <motion.div
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {pageName !== "inventory" && (
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        checked={
                          selectedProducts.length === currentProducts.length &&
                          currentProducts.length > 0
                        }
                        onChange={handleToggleSelectAll}
                      />
                    </div>
                  </th>
                )}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  পণ্য
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                >
                  <div className="flex items-center">
                    <span>মূল্য</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <span>ক্যাটাগরি</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                >
                  <div className="flex items-center">
                    <span>স্টক</span>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  স্ট্যাটাস
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  variants={itemVariants}
                  className="hover:bg-gray-50"
                >
                  {pageName !== "inventory" && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleToggleSelect(product.id)}
                      />
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatPrice(product.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryBg(
                        product.category
                      )}`}
                    >
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity > 5 ? (
                      <span>{product.quantity} পিস</span>
                    ) : product.quantity > 0 ? (
                      <span className="text-orange-600 font-medium">
                        {product.quantity} পিস
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">স্টক নেই</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBg(
                        product.inStock
                      )}`}
                    >
                      {getStatusText(product.inStock)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {pageName !== "inventory" ? (
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="text-amber-600 hover:text-amber-900"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="text-blue-600 hover:text-blue-900 cursor-pointer"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          onClick={() => handleDeleteProducts(product.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="text-amber-600 hover:text-amber-900 cursor-pointer"
                        >
                          <Box size={24} />
                        </button>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      {/* Use AnimatePresence to enable exit animations */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <StockModal product={selectedProduct} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductTable;
