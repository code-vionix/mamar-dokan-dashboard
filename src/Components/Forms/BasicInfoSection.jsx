import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input"; // Import the new Input component

export default function BasicInfoSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const price = watch("price");

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4">মৌলিক তথ্য</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-2">
          {/* Using the new Input component */}
          <Input
            label="পণ্যের নাম *"
            name="name"
            placeholder="পণ্যের সম্পূর্ণ নাম লিখুন"
            error={errors.name}
            validation={{ required: "পণ্যের নাম আবশ্যক" }}
          />
        </div>
        {/* Using the new Input component */}
        <Input
          label="মূল্য (৳) *"
          name="price"
          placeholder="15000"
          type="number"
          error={errors.price}
          validation={{
            required: "পণ্যের মূল্য আবশ্যক",
            valueAsNumber: true,
            min: {
              value: 0.01,
              message: "মূল্য ০ এর চেয়ে বেশি হতে হবে",
            },
          }}
        />
        {/* Using the new Input component */}
        <Input
          label="বিশেষ মূল্য (৳)"
          name="salePrice"
          placeholder="14000"
          type="number"
          error={errors.salePrice}
          validation={{
            valueAsNumber: true,
            validate: (value) =>
              !value ||
              value < price ||
              "বিশেষ মূল্য মূল মূল্যের চেয়ে কম হতে হবে।",
          }}
        />
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium mb-2"
          >
            পণ্যের বিবরণ *
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন"
            {...register("description", {
              required: "পণ্যের বিবরণ আবশ্যক",
            })}
            className={`w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-amber-500"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
