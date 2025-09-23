import { forwardRef } from "react";

// Button Component
const Button = forwardRef(
  (
    { children, className, variant = "default", size = "default", ...props },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantStyles = {
      default: "bg-amber-600 text-white hover:bg-amber-700",
      outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
      ghost: "hover:bg-gray-100 text-gray-700",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      success: "bg-green-600 text-white hover:bg-green-700",
      secondary: "bg-rose-100 text-rose-700 hover:bg-rose-200",
    };

    const sizeStyles = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 rounded-md text-xs",
      lg: "h-12 px-8 rounded-md text-lg",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${
          sizeStyles[size]
        } ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

// Heading Component
const Heading = forwardRef(({ children, className = "", ...props }, ref) => (
  <h1
    ref={ref}
    className={`text-2xl font-semibold text-gray-800 ${className}`}
    {...props}
  >
    {children}
  </h1>
));
Heading.displayName = "Heading";

// Input Component
const Input = forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Select Component
const Select = forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <select
      className={`flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

const Badge = ({ children, variant }) => {
  // A mapping of badge types to Tailwind CSS class names for coloring.
  const colorClasses = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
    loyal: "bg-purple-100 text-purple-800",
    vip: "bg-yellow-100 text-yellow-800",
    regular: "bg-blue-100 text-blue-800",
    new: "bg-indigo-100 text-indigo-800",
  };

  // The base styling for all badges.
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";

  // Get the color class based on the provided variant, with a fallback to gray.
  const variantClass = colorClasses[variant] || "bg-gray-100 text-gray-800";

  // Combine the base classes with the dynamic variant class.
  const finalClasses = `${baseClasses} ${variantClass}`;

  return <span className={finalClasses}>{children}</span>;
};
export { Badge, Button, Heading, Input, Select };
