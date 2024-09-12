import React, { useState } from 'react';
import { OrderFilters, LoadingWrapper, OrderItems, OrderActions, OrderDetails } from '@components/index';
import { useOrderFilters, useOrders } from '@hooks/index';
import { patchOrder } from '@api/orders';
import { OrderStatus } from '@api/types';

const OrdersPage: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useOrderFilters({ selectedStatus: null, sortOrder: 'asc' });
  const { orders, loading, error, loadOrders } = useOrders(filters);
  const [showItemsOrderId, setShowItemsOrderId] = useState<string | null>(null);

  const handleCompleteOrder = async (id: string) => {
    try {
      await patchOrder(id, { status: OrderStatus.Archived });
      loadOrders();
    } catch (error) {
      console.error('Failed to complete order:', error);
    }
  };

  const toggleShowItems = (id: string) => {
    setShowItemsOrderId(prevId => (prevId === id ? null : id));
  };

  return (
    <div>
      <h1>Заказы</h1>
      
      <OrderFilters
        selectedStatus={filters.selectedStatus}
        sortOrder={filters.sortOrder}
        onStatusChange={(value) => updateFilters({ selectedStatus: value })}
        onSortOrderChange={(value) => updateFilters({ sortOrder: value })}
        onReset={resetFilters}
      />

      <LoadingWrapper
        data={orders}
        loading={loading}
        error={error}
        onReload={loadOrders}
        emptyDescription="Заказы не найдены"
      >
        {orders.map(order => {
          const { id, status, items, total, createdAt } = order;
          const isItemsVisible = showItemsOrderId === id;

          return (
            <div key={id} style={{ border: '1px solid #ddd', padding: 20, marginBottom: 20 }}>
              <OrderDetails 
                id={id}
                status={status}
                itemsCount={items.length}
                total={total}
                createdAt={createdAt}
              />

              <OrderActions
                orderId={id}
                status={status}
                isItemsVisible={isItemsVisible}
                onToggleItems={toggleShowItems}
                onCompleteOrder={handleCompleteOrder}
              />

              {isItemsVisible && <OrderItems items={items} />}
            </div>
          );
        })}
      </LoadingWrapper>
    </div>
  );
};

export default OrdersPage;
