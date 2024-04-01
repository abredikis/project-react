import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import api from '@/api';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator, Spinner } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    dates: undefined,
    guests: 0,
  });

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      setError(false);
      abortController.current = new AbortController();

      try {
        const response = await api.get('/api/listings', {
          params: filters,
          signal: abortController.current?.signal,
        });

        setListings(response.data);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }

        setError('Listings could not be retrieved, try again later');
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();

    return () => {
      abortController.current?.abort();
    };
  }, [filters]);

  const handleFilters = (filters) => setFilters(filters);

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
      </div>
      {renderListingList()}
    </div>
  );
};

export default HomePage;
