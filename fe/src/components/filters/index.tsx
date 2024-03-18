import { useEffect } from 'react';
import { Dropdown, DropdownOption } from '../dropdown';
import { Search } from '../search';
import { useGetFeaturesMutation } from 'state/api';

const sortOptions: DropdownOption[] = [
  { name: 'price', title: 'Cena' },
  { name: 'capacity', title: 'Pojemność' },
];

export const Filters = () => {

  const [getFeatures, result] = useGetFeaturesMutation()

  useEffect(() => {
    const fetchFeatures = async () => {
      await getFeatures(null)
    }
    fetchFeatures()
  }, [])
  if (result.isLoading || !result.isSuccess) {
    return (
      <div>
        <p className="text-center text-gray-500 text-xl mt-4">
          Loading Data
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 pt-6 flex max-w-xs mx-auto">
        <Search />
      </div>
      <div className="grid grid-cols-4 gap-x-3 mb-4">
        <div>
          <div className="block text-sm font-bold text-black text-lg mb-2">Sortuj</div>
          <Dropdown options={sortOptions} filter={'sort'} />
        </div>
        <div>
          <div className="block text-sm font-bold text-black text-lg mb-2">Funkcje</div>
          <Dropdown options={result.data.features as DropdownOption[]} filter={'feature'} />
        </div>
        <div>
          <div className="block text-sm font-bold text-black text-lg mb-2">Klasa energetyczna</div>
          <Dropdown options={result.data.energyClasses as DropdownOption[]} filter={'energyClass'} />
        </div>
        <div>
          <div className="block text-sm font-bold text-black text-lg mb-2">Pojemność</div>
          <Dropdown options={result.data.capacity as DropdownOption[]} filter={'capacity'} />
        </div>
      </div>
    </div>
  );
};
