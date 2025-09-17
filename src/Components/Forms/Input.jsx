import React from "react";
import { useFormContext } from "react-hook-form";

const Input = React.forwardRef(
  ({ label, name, type = "text", placeholder, error, ...rest }, ref) => {
    const { register } = useFormContext();

    // Determine the input class based on whether there's an error
    const inputClass = `w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 ${
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-amber-500"
    }`;

    return (
      <div>
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, rest.validation)}
          {...rest}
          className={inputClass}
        />
        {/* Conditionally render the error message */}
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    );
  }
);

export default Input;
