import { useEffect, useMemo, useState } from 'react';

import {
  isListingAvailable,
  listings as staticListings,
} from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui/Separator';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);
  const [filters, setFilters] = useState({
    search: '',
    dates: null,
    guests: 0,
  });

  const handleFilters = (filters) => setFilters(filters);

  const filteredListings = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const dates = filters.dates;
    const guests = filters.guests;

    return listings.filter((listing) => {
      if (search && !listing.name.toLowerCase().includes(search)) return false;
      if (dates && !isListingAvailable(listing, dates)) return false;
      if (guests && listing.maxGuests < guests) return false;

      return true;
    });
  }, [filters, listings]);

  return (
    <div className='container py-4'>
      <div className='mb-8'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={filteredListings} />
    </div>
  );
};

export default HomePage;
