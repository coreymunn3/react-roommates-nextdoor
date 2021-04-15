import React, { useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ElevatedSection from '../../layout/elevatedSection/ElevatedSection';
import PostCard from '../../postCard/PostCard';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getPostByUser } from '../../../redux/postSlice';

const MyPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostByUser());
  }, []);
  const { userPosts, isLoading } = useSelector((state) => state.post);

  return (
    <div>
      <ElevatedSection>
        <h4>Manage Listings</h4>
        {isLoading ? (
          <Spinner animation='border' />
        ) : (
          userPosts.map((post) => (
            <PostCard key={post._id} post={post} edit={true} />
          ))
        )}
      </ElevatedSection>
    </div>
  );
};

export default MyPosts;
