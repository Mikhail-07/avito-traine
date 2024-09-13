import React from 'react';
import { OrderItem } from '@api/types';

interface OrderItemsProps {
  items: OrderItem[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => (
  <div className="order-items-container">
    {items.map(item => (
      <div key={item.id} className="order-item">
        <img 
          src={item.imageUrl || '/logo.svg'}
          alt={item.name} 
          className="order-item-image" 
        />
        <span className="order-item-name">{item.name}</span>
      </div>
    ))}
  </div>
);

export default OrderItems;
