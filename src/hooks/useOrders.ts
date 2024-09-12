import { useState, useEffect, useCallback } from 'react';
import { fetchOrders } from '@api/orders';
import { Order } from '@api/types';

export const useOrders = (filters: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedOrders = await fetchOrders();

      let filteredOrders = fetchedOrders.data;

      if (filters.selectedStatus !== null) {
        filteredOrders = filteredOrders.filter(order => order.status === filters.selectedStatus);
      }

      filteredOrders = filteredOrders.sort((a, b) => {
        return filters.sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
      });

      setOrders(filteredOrders);
    } catch (error) {
      setError('Ошибка при загрузке заказов.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return { orders, loading, error, loadOrders };
};

export default useOrders;
