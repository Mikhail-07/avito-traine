import React, { useState } from 'react';
import { Button } from 'antd';
import { NewAdModal } from '@components/index';
import { createAdvertisement } from '@api/advertisements';
import { useNotification } from '@hooks/index';

const AdsActions: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showError, showSuccess } = useNotification();

  const handleCreate = async (values: any) => {
    const currentDate = new Date().toISOString();

    try {
      await createAdvertisement({ ...values, likes: 0, views: 0, createdAt: currentDate });
      showSuccess('Объявление успешно создано!');
      setIsModalOpen(false);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <Button 
        type="primary" 
        size="large" 
        onClick={() => setIsModalOpen(true)} 
        style={{ marginBottom: '20px', marginTop: '20px'}}
      >
        Создать новое объявление
      </Button>
      <NewAdModal 
        visible={isModalOpen} 
        onCreate={handleCreate} 
        onCancel={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default AdsActions;
