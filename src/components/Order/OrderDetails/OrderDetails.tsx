import React from 'react';
import { OrderStatus } from '@api/types';

interface OrderDetailsProps {
  id: string;
  status: typeof OrderStatus[keyof typeof OrderStatus];
  itemsCount: number;
  total: number;
  createdAt: string;
}

const getStatusName = (status: typeof OrderStatus[keyof typeof OrderStatus]): string => {
  return Object.keys(OrderStatus).find(key => OrderStatus[key as keyof typeof OrderStatus] === status) || 'Неизвестный статус';
};

const OrderDetails: React.FC<OrderDetailsProps> = ({ id, status, itemsCount, total, createdAt }) => {
  return (
    <div className="order-details">
      <p><strong>Заказ № {id}</strong></p>
      <p>Статус: {getStatusName(status)}</p>
      <p>Количество товаров: {itemsCount}</p>
      <p>Стоимость заказа: ${total}</p>
      <p>Дата создания: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default OrderDetails;
