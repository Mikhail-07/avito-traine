import axios from './axios';
import { Order } from './types';

// Получение всех заказов с поддержкой пагинации
export const fetchOrders = (start = 0, limit = 10) => {
  const params = { _start: start, _limit: limit };
  return axios.get<Order[]>('/orders', { params });
};

// Получение заказа по ID
export const fetchOrderById = (id: string) => {
  return axios.get<Order>(`/orders/${id}`);
};

// Обновление заказа по ID (PUT)
export const updateOrder = (id: string, order: Partial<Order>) => {
  return axios.put<Order>(`/orders/${id}`, order);
};

// Частичное обновление заказа по ID (PATCH)
export const patchOrder = (id: string, order: Partial<Order>) => {
  return axios.patch<Order>(`/orders/${id}`, order);
};

// Удаление заказа по ID
export const deleteOrder = (id: string) => {
  return axios.delete(`/orders/${id}`);
};
