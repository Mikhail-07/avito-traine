import React from 'react';
import { Card, Image } from 'antd';
import { Advertisment } from '@api/types';
import { EyeOutlined } from '@ant-design/icons';
import { LikeButton } from '@components/index';
import { useNavigate } from 'react-router-dom';
import styles from './AdCard.module.less';

const { Meta } = Card;

interface AdCardProps {
  ad: Advertisment;
}

const AdCard: React.FC<AdCardProps> = ({ ad }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ads/${ad.id}`);
  };

  return (
    <Card
      hoverable
      cover={
        <div className={styles['image-container']}>
          <Image
            alt={ad.name}
            src={ad.imageUrl || '/logo.svg'}
            fallback="/logo.svg"
            preview={false}
            className={styles['ad-image']}
          />
        </div>
      }
      className={styles['ad-card']}
      onClick={handleCardClick}
    >
      <Meta title={ad.name} description={`Price: ${ad.price}₽`} />
      <div className={styles['ad-card-actions']}>
        <div>
          <EyeOutlined /> {ad.views}
        </div>
        <div>
          <LikeButton adId={ad.id} initialLikes={ad.likes} />
        </div>
      </div>
    </Card>
  );
};

export default AdCard;
