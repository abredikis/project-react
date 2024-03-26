import { Card, CardContent } from '@/components/ui/Card';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing }) => {
  return (
    <Card className='w-[320px]'>
      <img src={getImageUrl(listing.images?.[0])} alt={listing.name} />
      <CardContent className='h-[200px] w-full rounded-md object-cover'>
        <h2 className='mb-0 text-xl font-semibold'>{listing.name}</h2>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
