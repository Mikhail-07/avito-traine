import React from 'react';
const { expect, describe, it } = require('@jest/globals');
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import AdsPage from '../src/pages/AdsPage';
import { useAdvertisements, useFavorites, useAdFilters } from '../src/hooks';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), 
      removeListener: jest.fn(), 
      addEventListener: jest.fn(), 
      removeEventListener: jest.fn(), 
      dispatchEvent: jest.fn(),
    })),
  });
});

jest.mock('@hooks/index', () => ({
  useAdvertisements: jest.fn(),
  useFavorites: jest.fn(),
  useAdFilters: jest.fn(),
  useNotification: jest.fn().mockReturnValue({
    showError: jest.fn(),
    showSuccess: jest.fn(),
  }),
}));

const mockAds = [
  { id: "1", name: "Стул старинный", price: 2000, views: 20, likes: 2, imageUrl: "" },
  { id: "2", name: "Ведро снега", price: 3000, views: 77835, likes: 45665, imageUrl: "" },
  { id: "3", name: "Плащ невидимка", price: 10000000, views: 900, likes: 19, imageUrl: "" },
  { id: "4", name: "Ковер", price: 5000, views: 2000001, likes: 2, imageUrl: "" },
];

describe('AdsPage Component', () => {
  beforeEach(() => {
    (useAdFilters as jest.Mock).mockReturnValue({
      filters: {
        currentPage: 0,
        adsPerPage: 10,
        searchQuery: '',
        priceRange: [null, null],
        minViews: null,
        minLikes: null,
      },
      updateFilters: jest.fn(),
    });
    (useAdvertisements as jest.Mock).mockReturnValue(mockAds);
    (useFavorites as jest.Mock).mockReturnValue([]);
  });


  it('should handle price range filter', () => {
    render(
      <BrowserRouter>
        <AdsPage />
      </BrowserRouter>
    );
  
    const minPriceInput = screen.getByPlaceholderText('Минимальная цена');
    const maxPriceInput = screen.getByPlaceholderText('Максимальная цена');
  
    fireEvent.change(minPriceInput, { target: { value: '2000' } });
    fireEvent.change(maxPriceInput, { target: { value: '10000' } });
  
    expect(useAdFilters().updateFilters).toHaveBeenNthCalledWith(1, {
      priceRange: [2000, null],
    });
  
    expect(useAdFilters().updateFilters).toHaveBeenNthCalledWith(2, {
      priceRange: [null, 10000],
    });
  });
  
  it('should handle views filter', () => {
    render(
      <BrowserRouter> 
        <AdsPage />
      </BrowserRouter>
    );

    const minViewsInput = screen.getByPlaceholderText('Минимальные просмотры');
    fireEvent.change(minViewsInput, { target: { value: '100' } });

    expect(useAdFilters().updateFilters).toHaveBeenCalledWith({
      minViews: 100,
    });
  });

  it('should handle likes filter', () => {
    render(
      <BrowserRouter> 
        <AdsPage />
      </BrowserRouter>
    );

    const minLikesInput = screen.getByPlaceholderText('Минимальные лайки');
    fireEvent.change(minLikesInput, { target: { value: '10' } });

    expect(useAdFilters().updateFilters).toHaveBeenCalledWith({
      minLikes: 10,
    });
  });

  it('should reset filters', () => {
    render(
      <BrowserRouter> 
        <AdsPage />
      </BrowserRouter>
    );

    const resetButton = screen.getByText('Сбросить фильтры');
    fireEvent.click(resetButton);

    expect(useAdFilters().updateFilters).toHaveBeenCalledWith({
      searchQuery: '',
      priceRange: [null, null],
      minViews: null,
      minLikes: null,
    });
  });
});
