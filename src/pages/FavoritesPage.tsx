import React from 'react';
import { Typography } from 'antd';
import { AdsList, PaginationControls, AdsPerPageSelector } from '@components/index';
import { useFavorites } from '@hooks/index';
import { useAdFilters } from '@hooks/useAdFilters';

const { Title } = Typography;

const FavoritesPage: React.FC = () => {
  const { filters, updateFilters } = useAdFilters();
  const favoriteAds = useFavorites();

  

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Мои любимые объявления</Title>
      <AdsPerPageSelector 
        adsPerPage={filters.adsPerPage} 
        onChange={(value) => updateFilters({ adsPerPage: value })} 
      />
      <PaginationControls
        currentPage={filters.currentPage}
        adsPerPage={filters.adsPerPage}
        totalAds={favoriteAds.length}
        onPrevPage={() => updateFilters({ currentPage: Math.max(filters.currentPage - filters.adsPerPage, 0) })}
        onNextPage={() => updateFilters({ currentPage: filters.currentPage + filters.adsPerPage })}
      />
      <AdsList ads={favoriteAds} loading={false} error={null} />
    </div>
  );
};

export default FavoritesPage;
