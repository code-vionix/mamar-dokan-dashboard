import { forwardRef } from "react";

const Card = forwardRef(({ children, className = "" }, ref) => {
  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export { Card };
