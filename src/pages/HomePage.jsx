import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DataRenderer from '@/components/DataRendered';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice';

const HomePage = () => {
  const { listings, error, status } = useSelector((state) => state.listings);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    search: '',
    dates: undefined,
    guests: 0,
  });

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  useEffect(() => {
    const request = dispatch(fetchListings(fetchOptions));

    return () => {
      request.abort();
    };
  }, [dispatch, fetchOptions]);

  return (
    <div className='container py-4'>
      <div className='mb-8'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
        <DataRenderer error={error} isLoading={status === 'loading'}>
          <ListingList listings={listings} />
        </DataRenderer>
      </div>
    </div>
  );
};

export default HomePage;
