import React from "react";
import { useFormContext } from "react-hook-form";

const Select = React.forwardRef(({ label, name, options, ...rest }, ref) => {
  const { register } = useFormContext();

  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        {...rest}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
