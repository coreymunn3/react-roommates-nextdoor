import React from 'react';
import Container from 'react-bootstrap/Container';
import FeedControls from '../../feedControls/FeedControls';
// redux
import { useSelector } from 'react-redux';

const Feed = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  return (
    <Container>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
        <div>
          <h3>{`Recent Posts In ${user?.user?._location?.city}, ${user?.user?._location?.state}`}</h3>
          <FeedControls />
          {/* posts */}
        </div>
      )}
    </Container>
  );
};

export default Feed;
