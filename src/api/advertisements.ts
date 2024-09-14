import axios from './axios';
import { Advertisment } from './types';

// Получение всех объявлений с поддержкой пагинации, сортировки, фильтрации и поиска
export const fetchAdvertisements = (
  start = 0,
  limit = 10,
  search = '',
  priceRange?: [number | null, number | null],
  views = 0,
  likes = 0
) => {
  const params: any = { 
    _start: start, 
    _limit: limit, 
    views_gte: views, 
    likes_gte: likes 
  };
  
  if (priceRange) {
    if (priceRange[0] !== null) {
      params.price_gte = priceRange[0];
    }
    if (priceRange[1] !== null) {
      params.price_lte = priceRange[1];
    }
  }

  if (search) {
    params.q = search; 
  }

  return axios.get<Advertisment[]>('/advertisements', { params }).then(response => response.data);
};


// Получение объявления по ID
export const fetchAdvertisementById = (id: string) => {
  return axios.get<Advertisment>(`/advertisements/${id}`);
};

// Создание нового объявления
export const createAdvertisement = (advertisement: Omit<Advertisment, 'id'>) => {
  return axios.post<Advertisment>('/advertisements', advertisement);
};

// Обновление объявления по ID (PUT)
export const updateAdvertisement = (id: string, advertisement: Partial<Advertisment>) => {
  return axios.put<Advertisment>(`/advertisements/${id}`, advertisement);
};

// Частичное обновление объявления по ID (PATCH)
export const patchAdvertisement = (id: string, advertisement: Partial<Advertisment>) => {
  return axios.patch<Advertisment>(`/advertisements/${id}`, advertisement);
};

// Удаление объявления по ID
export const deleteAdvertisement = (id: string) => {
  return axios.delete(`/advertisements/${id}`);
};
