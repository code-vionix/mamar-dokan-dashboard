/**
 * Formats a given price into a Bangladeshi Taka (৳) currency string.
 */
export const formatPrice = (price) => {
  return "৳" + price.toLocaleString("bn-BD");
};

/**
 * Returns a user-friendly status text in Bengali based on the product's status.

 */
export const getStatusText = (status) => {
  switch (status) {
    case true:
      return "সক্রিয়";
    case false:
      return "স্টক নেই";
    case null:
      return "ড্রাফট";
    default:
      return status;
  }
};

/**
 * Returns the appropriate Tailwind CSS classes for the status text background.
 */
export const getStatusBg = (status) => {
  switch (status) {
    case true:
      return "bg-green-100 text-green-800";
    case false:
      return "bg-red-100 text-red-800";
    case null:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * Returns the appropriate Tailwind CSS classes for the category tag background.
                
 */
export const getCategoryBg = () => {
  return "bg-amber-100 text-amber-800";
};
