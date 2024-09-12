import { useState, useEffect } from 'react';
import { fetchAdvertisements } from '@api/advertisements';
import { Advertisment, Filters } from '@api/types';

export const useAdvertisements = (filters: Filters) => {
  const [ads, setAds] = useState<Advertisment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAds = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedAds = await fetchAdvertisements(
          filters.currentPage, 
          filters.adsPerPage, 
          '', 
          filters.priceRange, 
          filters.minViews ?? 0, 
          filters.minLikes ?? 0
        );

        const searchQuery = filters.searchQuery ?? '';
        const filteredAds = fetchedAds.filter(ad =>
          ad.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setAds(filteredAds);
      } catch (error) {
        setError('Ошибка при загрузке объявлений.');
      } finally {
        setLoading(false);
      }
    };

    loadAds();
  }, [filters]);

  return { ads, loading, error };
};
