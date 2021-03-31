import React, { useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { getPostById } from '../../../redux/postSlice';

const SingleListing = ({ match }) => {
  const dispatch = useDispatch();
  const { id: postId } = match.params;
  // fetch the relevant post information on load
  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);
  return (
    <div>
      <h1>This is a Single Listing</h1>
    </div>
  );
};

export default SingleListing;
