import { useCallback, useMemo, useState } from 'react';

import DataRenderer from '@/components/DataRendered';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import useFetch from '@/hooks/useFetch';

const HomePage = () => {
  const [filters, setFilters] = useState({
    search: '',
    dates: undefined,
    guests: 0,
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: listings,
    error,
    isLoading,
  } = useFetch('/api/listings', fetchOptions);

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-8'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
        <DataRenderer error={error} isLoading={isLoading}>
          <ListingList listings={listings} />
        </DataRenderer>
      </div>
    </div>
  );
};

export default HomePage;
