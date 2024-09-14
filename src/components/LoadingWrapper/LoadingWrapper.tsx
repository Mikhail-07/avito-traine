import React, { useEffect, useState } from 'react';
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
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const delay = 300;
    let timeout: NodeJS.Timeout;

    if (loading) {
      timeout = setTimeout(() => {
        setShowLoader(true);
      }, delay);
    } else {
      setShowLoader(false);
    }

    return () => clearTimeout(timeout);
  }, [loading]);

  if (loading && showLoader) {
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
