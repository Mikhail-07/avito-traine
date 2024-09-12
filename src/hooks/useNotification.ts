import { message } from 'antd';
import { useCallback } from 'react';

const useNotification = () => {
  const showError = useCallback((error: any) => {
    message.error(`Ошибка: ${error.message || 'Что-то пошло не так'}`);
  }, []);

  const showSuccess = useCallback((successMessage: string) => {
    message.success(successMessage || 'Операция выполнена успешно!');
  }, []);

  return {
    showError,
    showSuccess,
  };
};

export default useNotification;
