  import { useState } from "react";

  export const useAdFilters = () => {
    const initialFilters = {
      currentPage: 0,
      adsPerPage: 10,
      searchQuery: '',
      priceRange: [null, null] as [number | null, number | null],
      minViews: null as number | null | undefined,
      minLikes: null as number | null | undefined,
    };
  
    const [filters, setFilters] = useState(initialFilters);
  
    const updateFilters = (newFilters: Partial<typeof filters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    };
  
    const resetFilters = () => {
      setFilters(initialFilters);
    };
  
    return { filters, updateFilters, resetFilters };
  };