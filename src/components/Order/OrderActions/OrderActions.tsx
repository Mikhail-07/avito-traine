import React from 'react';
import { Button } from 'antd';

interface OrderActionsProps {
  orderId: string;
  status: number;
  isItemsVisible: boolean;
  onToggleItems: (id: string) => void;
  onCompleteOrder: (id: string) => void;
}

const OrderActions: React.FC<OrderActionsProps> = ({ orderId, status, isItemsVisible, onToggleItems, onCompleteOrder }) => (
  <div>
    {status !== 5 && (
      <Button onClick={() => onCompleteOrder(orderId)}>Завершить заказ</Button>
    )}

    <Button onClick={() => onToggleItems(orderId)}>
      {isItemsVisible ? 'Скрыть товары' : 'Показать все товары'}
    </Button>
  </div>
);

export default OrderActions;
