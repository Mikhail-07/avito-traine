import React from 'react';
import { Input, Button } from 'antd';
import styles from './AdsFilters.module.less';
import { Filters } from '@api/types'

interface AdsFiltersProps {
  filters: Filters;
  onFiltersChange: (newFilters: Partial<Filters>) => void;
  onSearch: (value: string) => void;
  onReset: () => void;
}

const { Search } = Input;
const AdsFilters: React.FC<AdsFiltersProps> = ({ filters, onFiltersChange, onSearch, onReset }) => {
const handleInputChange = (field: keyof Filters, value: number | null, index?: number) => {
  if (field === 'priceRange' && typeof index !== 'undefined') {
    const updatedPriceRange = [...filters.priceRange];
    updatedPriceRange[index] = value;
    onFiltersChange({ priceRange: updatedPriceRange as [number | null, number | null] });
  } else {
    onFiltersChange({ [field]: value });
  }
};
  
const filterFields = [
  { placeholder: 'Минимальная цена', value: filters.priceRange[0], field: 'priceRange', index: 0 },
  { placeholder: 'Максимальная цена', value: filters.priceRange[1], field: 'priceRange', index: 1 },
  { placeholder: 'Минимальные просмотры', value: filters.minViews, field: 'minViews' },
  { placeholder: 'Минимальные лайки', value: filters.minLikes, field: 'minLikes' },
];

return (
  <div className={styles.filtersContainer}>
    <div className={styles.searchRow}>
      <Search
        className={styles.searchInput}
        placeholder="Поиск по названию"
        allowClear
        enterButton="Поиск"
        size="large"
        onSearch={onSearch}
      />
      <Button 
        type="default" 
        size="large" 
        onClick={onReset} 
        className={styles.searchButton}
      >
        Сбросить фильтры
      </Button>
    </div>
    <div className={styles.filterRow}>
      {filterFields.map((filter, idx) => (
        <div className={styles.filterCol} key={idx}>
          <Input
            type="number"
            placeholder={filter.placeholder}
            value={filter.value !== null ? filter.value : ''}
            onChange={(e) => handleInputChange(
              filter.field as keyof Filters,
              e.target.value ? Number(e.target.value) : null,
              filter.index // Передаём индекс для priceRange
            )}
            className={styles.filterInput}
          />
        </div>
      ))}
    </div>
  </div>
  );
};

export default AdsFilters;