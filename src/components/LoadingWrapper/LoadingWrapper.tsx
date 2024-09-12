import React from 'react';
import { Spin, Empty, Button } from 'antd';

interface LoadingWrapperProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  onReload?: () => void;
  emptyDescription?: React.ReactNode;
  children: React.ReactNode;
}

const LoadingWrapper = <T,>({
  data,
  loading,
  error,
  onReload,
  emptyDescription = 'Нет данных',
  children,
}: LoadingWrapperProps<T>) => {
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Empty
          description={
            <>
              <p>{error}</p>
              {onReload && (
                <Button type="primary" onClick={onReload}>
                  Обновить страницу
                </Button>
              )}
            </>
          }
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Empty description={emptyDescription} />
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingWrapper;
