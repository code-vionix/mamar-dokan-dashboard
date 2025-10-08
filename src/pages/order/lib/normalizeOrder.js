import getUiAvatar from "../utils/getUiAvatar";

const normalizeOrder = (o) => {
  // Detect API shape by presence of `user` or `items`
  const looksLikeApi = !!(o && (o.user || o.items));

  if (!looksLikeApi) return o;

  const user = o.user || {};
  const items = o.items || [];

  const products = items.map((it) => {
    return {
      name: it.product.name || `Product ${it.productId?.slice?.(0, 6) ?? ""}`,
      image:
        it.product.images?.[0] ||
        getUiAvatar((it.product.name && it.product.name.charAt(0)) || "P", 40),
      quantity: it.quantity ?? 1,
      ...it,
    };
  });

  return {
    id: o.id,
    // create a short orderNumber if original doesn't have one
    orderNumber:
      o.orderNumber || (o.id ? o.id.slice(0, 8).toUpperCase() : o.id),
    date: o.createdAt || o.updatedAt || o.date,
    status: o.status || "",
    payment: {
      amount: o.totalAmount ?? o.subtotal ?? 0,
      method: o.paymentMethod || o.payment_method || o.payment?.method || "COD",
      status: (o.paymentStatus || o.payment?.status || "").toLowerCase(),
    },
    customer: {
      name: user.name || o.user?.email || o.email || "Unknown",
      email: user.email || o.email || "",
      avatar: user.avatarUrl || user.avatar || "",
    },
    products,
    notes: o.notes || "",
    paymentStatus: o.paymentStatus || "",
    raw: { ...o }, // keep original if needed
  };
};
export default normalizeOrder;
