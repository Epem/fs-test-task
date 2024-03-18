import { Capacity, EnergyClass, Features } from '../interfaces/product';
import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

type Sort = 'price' | 'capacity';

export interface FiltersContextType {
  query: string;
  setQuery: (query: string) => void;
  filters: {
    sort: Sort | '';
    capacity: Capacity | '';
    energyClass: EnergyClass | '';
    feature: Features | '';
    page : string,
    limit : string
  };
  setFilters: (filters: FiltersContextType['filters']) => void;
}

const FiltersContext = createContext<FiltersContextType>({
  query: '',
  setQuery: () => null,
  filters: {
    sort: '',
    capacity: '',
    energyClass: '',
    feature: '',
    page : '1',
    limit: '6'
  },
  setFilters: () => null,
});

export const FiltersProvider = ({ children }: PropsWithChildren) => {
  const [query, setQuery] = useState<FiltersContextType['query']>('');
  const [filters, setFilters] = useState<FiltersContextType['filters']>({
    sort: '',
    capacity: '',
    energyClass: '',
    feature: '',
    page: '1',
    limit: '6'
  });

  const value = useMemo(
    () => ({
      query,
      setQuery,
      filters,
      setFilters,
    }),
    [query, filters]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
};

export const useFilterContext = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};
