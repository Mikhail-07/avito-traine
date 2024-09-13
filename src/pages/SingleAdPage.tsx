import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAdvertisementById, patchAdvertisement } from '../api/advertisements';
import { HeartOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Spin, Typography } from 'antd';
import { Advertisment } from '../api/types';
import NewAdModal from '../components/modal/NewAdModal';

const { Title, Text } = Typography;

const AdvertisementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setAdvertisement] = useState<Advertisment | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const loadAdvertisement = async () => {
      if (!id) {
        console.error('ID is not defined');
        setLoading(false);
        return;
      }

      try {
        const response = await fetchAdvertisementById(id);
        const adData = response.data;
        await patchAdvertisement(id, { views: (adData.views || 0) + 1 });
        setAdvertisement({ ...adData, views: (adData.views || 0) + 1 });
      } catch (error) {
        console.error('Error fetching advertisement:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdvertisement();
  }, [id]);

  const handleEdit = async (updatedAd: Omit<Advertisment, 'id'>) => {
    if (!id) return;
    try {
      await patchAdvertisement(id, updatedAd);
      setAdvertisement({ ...advertisement!, ...updatedAd });
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Failed to update advertisement:', error);
    }
  };

  if (loading) {
    return (
      <Spin tip="Loading advertisement...">
        <div style={{ height: '100vh' }}></div>
      </Spin>
    );
  }
  

  if (!advertisement) {
    return <div>Такого объявления не существует</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div>
        <Title level={2} style={{ fontWeight: 'bold' }}>
          {advertisement.name}
        </Title>
        <Title level={3} style={{ fontWeight: 'bold' }}>
          {advertisement.price} ₽
        </Title>
        <div>
          {advertisement.description && <Text>{advertisement.description}</Text>}
        </div>
        <Text>Опубликован: {new Date(advertisement.createdAt).toLocaleDateString()}</Text>
        <div style={{ marginTop: '10px' }}>
          <Text>
            <EyeOutlined /> { advertisement.views }
            <HeartOutlined /> { advertisement.likes }
          </Text>
        </div>

        <Button
          type="primary"
          icon={<EditOutlined />}
          style={{ marginTop: '20px' }}
          onClick={() => setIsEditModalVisible(true)}
        >
          Редактировать
        </Button>
      </div>

      <div>
        <img
          src={advertisement.imageUrl ? advertisement.imageUrl : '/logo.svg'}
          alt={advertisement.name}
          style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>

      <NewAdModal
        visible={isEditModalVisible}
        onCreate={handleEdit}
        onCancel={() => setIsEditModalVisible(false)}
        initialValues={advertisement}
      />
    </div>
  );
};

export default AdvertisementPage;
