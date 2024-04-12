import { Search } from 'lucide-react';
import { memo, useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = ({ onChange }) => {
  const [search, setSearch] = useState('');
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);

  const handleSubmit = () => {
    onChange({ search, dates, guests });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        placeholder='Search destinations'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        minDate={new Date()}
        placeholder='Add dates'
        value={dates}
        onChange={setDates}
      />
      <Stepper value={guests} onChange={setGuests} label='guest' />
      <Button onClick={handleSubmit}>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default memo(ListingFilters);
