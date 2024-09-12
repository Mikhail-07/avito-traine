import React from 'react';
import { Typography } from 'antd';
import { AdsList, PaginationControls, AdsPerPageSelector, AdsFilters, AdsActions } from '@components/index';
import { useAdvertisements, useAdFilters } from '@hooks/index';

const { Title } = Typography;

const AdsPage: React.FC = () => {
  const { filters, updateFilters, resetFilters } = useAdFilters();
  const { ads, loading, error } = useAdvertisements(filters);

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Объявления</Title>
      <AdsFilters
        filters={filters}
        onFiltersChange={updateFilters}
        onSearch={(value) => updateFilters({ searchQuery: value })}
        onReset={resetFilters}
      />
      <AdsActions />
      <AdsPerPageSelector adsPerPage={filters.adsPerPage} onChange={(value) => updateFilters({ adsPerPage: value })} />
      <PaginationControls
        currentPage={filters.currentPage}
        adsPerPage={filters.adsPerPage}
        totalAds={ads.length}
        onPrevPage={() => updateFilters({ currentPage: Math.max(filters.currentPage - filters.adsPerPage, 0) })}
        onNextPage={() => updateFilters({ currentPage: filters.currentPage + filters.adsPerPage })}
      />
      <AdsList
        ads={ads}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AdsPage;
