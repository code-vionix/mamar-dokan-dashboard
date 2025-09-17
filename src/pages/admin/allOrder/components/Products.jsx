import React from 'react'

function Products({selectedOrder}) {
  return (
    <div className="border-t border-gray-200 pt-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">অর্ডার আইটেম</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          পণ্য
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          মূল্য
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          সংখ্যা
                        </th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                          মোট
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-3 py-3">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 rounded-md object-cover"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-3 text-sm text-right text-gray-800">
                            ৳{product.price.toLocaleString()}
                          </td>
                          <td className="px-3 py-3 text-sm text-right text-gray-800">
                            {product.quantity}
                          </td>
                          <td className="px-3 py-3 text-sm text-right text-gray-800 font-medium">
                            ৳
                            {(
                              product.price * product.quantity
                            ).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td
                          colSpan={3}
                          className="px-3 py-3 text-sm text-right font-medium"
                        >
                          মোট
                        </td>
                        <td className="px-3 py-3 text-right font-semibold">
                          ৳{selectedOrder.payment.amount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
  )
}

export default Products
