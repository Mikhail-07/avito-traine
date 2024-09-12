import { useState } from 'react';

interface OrderFilters {
  selectedStatus: number | null;
  sortOrder: 'asc' | 'desc';
}

export const useOrderFilters = (initialFilters: OrderFilters) => {
  const [filters, setFilters] = useState<OrderFilters>(initialFilters);

  const updateFilters = (newFilters: Partial<OrderFilters>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return { filters, updateFilters, resetFilters };
};

export default useOrderFilters;
