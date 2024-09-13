import React from 'react';
import { Select, Button } from 'antd';
import { OrderStatus } from '@api/types';

interface OrderFiltersProps {
  selectedStatus: number | null;
  sortOrder: 'asc' | 'desc';
  onStatusChange: (value: number | null) => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onReset: () => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({ selectedStatus, sortOrder, onStatusChange, onSortOrderChange, onReset }) => {
  const selectedStatusValue = selectedStatus !== null ? selectedStatus : '';

  return (
    <div style={{ marginBottom: 20 }}>
      <Select
        placeholder="Статус"
        value={selectedStatusValue}
        onChange={(value) => onStatusChange(value !== "" ? Number(value) : null)}
        allowClear
        style={{ width: 200, marginRight: 20 }}
      >
        <Select.Option value="">Все</Select.Option>
        {(Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map((key) => (
          <Select.Option key={OrderStatus[key]} value={OrderStatus[key]}>
            {key}
          </Select.Option>
        ))}
      </Select>

      <Select
        value={sortOrder}
        onChange={onSortOrderChange}
        style={{ width: 150, marginRight: 20 }}
      >
        <Select.Option value="asc">Сначала дешевле</Select.Option>
        <Select.Option value="desc">Сначала дороже</Select.Option>
      </Select>

      <Button onClick={onReset}>Reset Filters</Button>
    </div>
  );
};

export default OrderFilters;
