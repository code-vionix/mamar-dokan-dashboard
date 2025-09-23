/**
 * The initial state for the product management dashboard.
 */
export const initialState = {
  products: [],
  loading: true,
  searchTerm: "",
  selectedCategory: "সকল",
  selectedStatus: "সকল",
  selectedProducts: [],
  sortConfig: { key: "dateAdded", direction: "desc" },
  currentPage: 1,
  itemsPerPage: 6,
};

/**
 * The reducer function that handles state changes based on dispatched actions.

 */
export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload, currentPage: 1 };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload, currentPage: 1 };
    case "SET_STATUS":
      return { ...state, selectedStatus: action.payload, currentPage: 1 };

    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_SELECT_ALL": {
      const allProductIds = action.payload.map((p) => p.id);
      const newSelectedProducts =
        state.selectedProducts.length === allProductIds.length
          ? []
          : allProductIds;
      return { ...state, selectedProducts: newSelectedProducts };
    }
    case "TOGGLE_SELECT_PRODUCT": {
      const productId = action.payload;
      const isSelected = state.selectedProducts.includes(productId);
      const updatedSelection = isSelected
        ? state.selectedProducts.filter((id) => id !== productId)
        : [...state.selectedProducts, productId];
      return { ...state, selectedProducts: updatedSelection };
    }
    case "TOGGLE_SELECT_ALL_DELETE": {
      const allProductIds = action.payload.map((p) => p.id);
      const newSelectedProducts =
        0 <= allProductIds.length ? [] : allProductIds;
      return { ...state, selectedProducts: newSelectedProducts };
    }
    case "DELETE_PRODUCT": {
      const productIdToDelete = action.payload;
      const updatedProducts = state.products.filter(
        (product) => product.id !== productIdToDelete
      );
      return {
        ...state,
        products: updatedProducts,
      };
    }
    default:
      return state;
  }
};
