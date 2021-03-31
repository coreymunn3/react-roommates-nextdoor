import React from 'react';

const SingleListing = ({ match }) => {
  const { postId } = match.params;
  return (
    <div>
      <h1>This is a Single Listing</h1>
    </div>
  );
};

export default SingleListing;
