import React from "react";
import { useFormContext } from "react-hook-form";
import Input from "./Input";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-4">
        পণ্যের বিস্তারিত
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="উপাদান *"
          name="material"
          placeholder="সিল্ক, কটন, ইত্যাদি"
          error={errors.material}
          {...register("material", { required: "পণ্যের উপাদান আবশ্যক" })}
        />
        <Input
          label="রঙ *"
          name="color"
          placeholder="নীল, লাল, ইত্যাদি"
          error={errors.color}
          {...register("color", { required: "পণ্যের রঙ আবশ্যক" })}
        />
        <Input
          label="নকশা *"
          name="pattern"
          placeholder="ফুল, পাখি, ইত্যাদি"
          error={errors.pattern}
          {...register("pattern", { required: "পণ্যের নকশা আবশ্যক" })}
        />
        <Input
          label="উৎপাদন অঞ্চল *"
          name="region"
          placeholder="টাঙ্গাইল, ঢাকা, ইত্যাদি"
          error={errors.region}
          {...register("region", { required: "উৎপাদন অঞ্চল আবশ্যক" })}
        />
      </div>
    </div>
  );
}
