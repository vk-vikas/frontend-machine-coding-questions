import { createContext, useContext, useEffect, useReducer } from "react";
import { filtersReducer, initialFilters } from "../reducers/filtersReducer";

const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [state, dispatch] = useReducer(filtersReducer, initialFilters);

  // Load filters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilters = {};

    if (params.get("categories"))
      urlFilters.categories = params.get("categories").split(",");

    if (params.get("minPrice"))
      urlFilters.minPrice = Number(params.get("minPrice"));
    if (params.get("maxPrice"))
      urlFilters.maxPrice = Number(params.get("maxPrice"));

    if (params.get("rating")) urlFilters.rating = Number(params.get("rating"));
    if (params.get("sortBy")) urlFilters.sortBy = params.get("sortBy");

    dispatch({ type: "SET_FROM_URL", payload: urlFilters });
  }, []);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (state.categories.length)
      params.set("categories", state.categories.join(","));

    params.set("minPrice", state.minPrice);
    params.set("maxPrice", state.maxPrice);

    if (state.rating) params.set("rating", state.rating);
    if (state.sortBy) params.set("sortBy", state.sortBy);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [state]);

  return (
    <FiltersContext.Provider value={{ filters: state, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
}

export const useFilters = () => useContext(FiltersContext);
