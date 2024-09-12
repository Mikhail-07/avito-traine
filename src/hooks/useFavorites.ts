import { useState, useEffect } from 'react';
import { fetchAdvertisementById } from '../api/advertisements';
import { message } from 'antd';
import { Advertisment } from '../api/types';

export const useFavorites = () => {
  const [favoriteAds, setFavoriteAds] = useState<Advertisment[]>([]);

  useEffect(() => {
    const loadFavoriteAds = async () => {
      try {
        const likedAds = JSON.parse(localStorage.getItem('likedAds') || '[]');
        const favorites: Advertisment[] = [];

        for (const id of likedAds) {
          try {
            const { data } = await fetchAdvertisementById(id);
            favorites.push(data);
          } catch (error) {
            console.error(`Объявление с ID ${id} не найдено.`);
          }
        }

        setFavoriteAds(favorites);
      } catch (error) {
        message.error('Ошибка при загрузке избранных объявлений.');
      }
    };

    loadFavoriteAds();
  }, []);

  return favoriteAds;
};
