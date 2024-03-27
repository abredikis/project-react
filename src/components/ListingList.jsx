import ListingCard from './ListingCard';

const ListingList = ({ listings }) => {
  return (
    <div>
      {listings.length > 0 ? (
        listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
      ) : (
        <p>No listings found</p>
      )}
    </div>
  );
};

export default ListingList;
