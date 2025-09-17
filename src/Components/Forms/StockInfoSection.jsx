import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";

export default function StockInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4">স্টক তথ্য</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="পরিমাণ *"
          name="quantity"
          placeholder="0"
          type="number"
          error={errors.quantity}
          {...register("quantity", {
            required: "পরিমাণ আবশ্যক",
            valueAsNumber: true,
            min: { value: 0, message: "পরিমাণ ০ বা তার বেশি হতে হবে" },
          })}
        />
        <div className="flex items-center h-full pt-8">
          <input
            type="checkbox"
            id="inStock"
            {...register("inStock")}
            className="h-5 w-5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
          />
          <label htmlFor="inStock" className="ml-2 block text-gray-700">
            স্টকে আছে
          </label>
        </div>
      </div>
    </div>
  );
}
