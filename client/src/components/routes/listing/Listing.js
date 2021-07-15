import React, { useEffect } from 'react';
import PostDetails from '../../postDetails/PostDetails';
import NotFound from '../notFound/NotFound';
import { CloudinaryContext } from 'cloudinary-react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../../redux/postSlice';

const Listing = ({ match }) => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.post);
  const { id: postId } = match.params;
  // fetch the relevant post information on load
  useEffect(() => {
    dispatch(getPostById(postId));
  }, []);
  return (
    <div>
      <CloudinaryContext cloudName={'dcmstbvwq'}>
        {!isLoading && isError ? (
          <NotFound message={'Post Not Found'} />
        ) : (
          <PostDetails />
        )}
      </CloudinaryContext>
    </div>
  );
};

export default Listing;
