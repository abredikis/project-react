import { DollarSign, Pin, Users } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/Card';
import { getImageUrl } from '@/lib/utils/images';

import ListingCardImages from './ListingCardImages';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <ListingCardImages listing={listing} />
      <CardContent className='p-4'>
        <h2 className='mb-2 text-xl font-semibold'>{listing.name}</h2>
        <div className='flex items-center gap-2'>
          <DollarSign className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            <span className='font-bold text-foreground'>{listing.price}</span> /
            night
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <Pin className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>{listing.location.name}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Users className='h-4 w-4 text-primary' />
          <span className='text-muted-foreground'>
            {listing.maxGuests} Guests
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
