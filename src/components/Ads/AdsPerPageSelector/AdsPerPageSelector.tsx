import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface AdsPerPageSelectorProps {
  adsPerPage: number;
  onChange: (value: number) => void;
}

const AdsPerPageSelector: React.FC<AdsPerPageSelectorProps> = ({ adsPerPage, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Select value={adsPerPage} onChange={onChange} style={{ width: 120 }}>
        <Option value={10}>10</Option>
        <Option value={20}>20</Option>
        <Option value={50}>50</Option>
      </Select>
    </div>
  );
};

export default AdsPerPageSelector;
