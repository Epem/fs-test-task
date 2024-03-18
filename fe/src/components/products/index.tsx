import { ProductCard } from '../cards/Product';
import { Button } from '../button';
import { useFilterContext } from '../../contexts/filters';
import { ChevronDown } from 'react-feather';
import { useGetProductsMutation } from "state/api";

import { useEffect } from 'react';

export const Products = () => {
  const { filters, query } = useFilterContext();

  const [getProducts, result] = useGetProductsMutation()

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(filters)
      console.log(data);
    }
    fetchProducts()
  }, [filters.capacity, filters.energyClass, filters.feature, filters.sort, filters.page])

  if (result.isLoading) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Loading Data
        </p>
      </div>
    );
  }

  const searchByCode = result.data?.filter((product) => {
    return product.code.toLowerCase().includes(query.toLowerCase());
  });

  const filteredProducts = searchByCode?.filter((product) => {
    if (filters.capacity && product.capacity !== filters.capacity) {
      return false;
    }
    if (filters.energyClass && product.energyClass !== filters.energyClass) {
      return false;
    }
    return !(filters.feature && !product.features.includes(filters.feature));
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    if (filters.sort === 'price') {
      return a.price.value - b.price.value;
    }
    if (filters.sort === 'capacity') {
      return parseInt(a.capacity) - parseInt(b.capacity);
    }
    return 0;
  });

  if (filteredProducts?.length === 0) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Brak produktów spełniających kryteria wyszukiwania
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-x-4 gap-y-5">
        {sortedProducts?.map((product) => (
          <ProductCard key={product.code} {...product} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          variant={'tertiary'}
          value={'Pokaż więcej'}
          icon={<ChevronDown />}
          onClick={() => console.log('some action')}
        />
      </div>
    </>
  );
};

