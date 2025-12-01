export const initialFilters = {
  categories: [],
  minPrice: 0,
  maxPrice: 5000,
  rating: null,
  sortBy: null,
};

export function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_FROM_URL":
      return { ...state, ...action.payload };

    case "TOGGLE_CATEGORY":
      const exists = state.categories.includes(action.payload);
      return {
        ...state,
        categories: exists
          ? state.categories.filter((c) => c !== action.payload)
          : [...state.categories, action.payload],
      };

    case "SET_PRICE":
      return { ...state, ...action.payload };

    case "SET_RATING":
      return { ...state, rating: action.payload };

    case "SET_SORT":
      return { ...state, sortBy: action.payload };

    case "CLEAR":
      return { ...initialFilters };

    default:
      return state;
  }
}
