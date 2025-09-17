import { motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import StockInfoSection from "../Forms/StockInfoSection";
/* variant start */
const modalVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeIn",
    },
  },
};
/* variant end */
export default function StockModal({ product, onClose }) {
  const methods = useForm({
    defaultValues: {
      // Set the initial value to the existing product quantity
      quantity: product?.quantity || 0,
      inStock: product?.inStock || false,
    },
  });

  const onSubmit = (data) => {
    //  api call
    console.log(data);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <motion.div
        className="relative w-auto max-w-lg mx-auto my-6 z-50"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t">
            <h3 className="text-xl font-semibold">
              স্টক যোগ করুন: {product?.name}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-500 float-right text-3xl leading-none font-semibold outline-none focus:outline-none cursor-pointer"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          {/* Body */}
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
              <StockInfoSection />
              {/* Footer */}
              <div className="flex items-center justify-end p-4 border-t border-solid border-gray-200 rounded-b mt-4">
                <button
                  className="bg-gray-200 text-gray-800 font-bold uppercase text-sm px-6 py-3 rounded mr-1 mb-1 cursor-pointer"
                  type="button"
                  onClick={onClose}
                >
                  বাতিল
                </button>
                <button
                  className="bg-amber-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-amber-600 outline-none focus:outline-none cursor-pointer"
                  type="submit"
                >
                  যোগ করুন
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </motion.div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
