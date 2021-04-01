import React, { useEffect } from 'react';
import PostDetails from '../../postDetails/PostDetails';
// redux
import { useDispatch } from 'react-redux';
import { getPostById } from '../../../redux/postSlice';

const Listing = ({ match }) => {
  const dispatch = useDispatch();
  const { id: postId } = match.params;
  // fetch the relevant post information on load
  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);
  return (
    <div>
      <PostDetails />
    </div>
  );
};

export default Listing;
