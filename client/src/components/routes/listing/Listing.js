import React, { useEffect } from 'react';
import PostDetails from '../../postDetails/PostDetails';
import { CloudinaryContext } from 'cloudinary-react';
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
      <CloudinaryContext
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
      >
        <PostDetails />
      </CloudinaryContext>
    </div>
  );
};

export default Listing;
