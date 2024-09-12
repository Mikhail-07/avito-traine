import React from 'react';
import { Button } from 'antd';

interface PaginationControlsProps {
  currentPage: number;
  adsPerPage: number;
  totalAds: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, adsPerPage, totalAds, onPrevPage, onNextPage }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <Button onClick={onPrevPage} disabled={currentPage === 0}>
        Назад
      </Button>
      <Button onClick={onNextPage} disabled={totalAds < adsPerPage}>
        Вперед
      </Button>
    </div>
  );
};

export default PaginationControls;
