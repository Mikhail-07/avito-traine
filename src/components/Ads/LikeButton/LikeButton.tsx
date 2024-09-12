import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { patchAdvertisement } from '@api/advertisements';
import { useNotification } from '@hooks/index';


interface LikeButtonProps {
  adId: string;
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ adId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useNotification();


  useEffect(() => {
    const likedAds = JSON.parse(localStorage.getItem('likedAds') || '[]');
    if (likedAds.includes(adId)) {
      setLiked(true);
    }
  }, [adId]);

  const handleLikeToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const likedAds = JSON.parse(localStorage.getItem('likedAds') || '[]');

    if (!liked) {
      likedAds.push(adId);
      localStorage.setItem('likedAds', JSON.stringify(likedAds));
    } else {
      const updatedLikedAds = likedAds.filter((id: string) => id !== adId);
      localStorage.setItem('likedAds', JSON.stringify(updatedLikedAds));
    }

    setLiked(!liked);
    setLikes(prevLikes => (liked ? prevLikes - 1 : prevLikes + 1));

    try {
      setLoading(true);
      await patchAdvertisement(adId, { likes: liked ? likes - 1 : likes + 1 });
    } catch (error) {
      showError('Лайк не учтен. Возможно проблемы с соединением');
      setLikes(prevLikes => (liked ? prevLikes + 1 : prevLikes - 1));
      setLiked(!liked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      icon={liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
      onClick={handleLikeToggle}
      loading={loading}
    >
      {likes}
    </Button>
  );
};

export default LikeButton;
