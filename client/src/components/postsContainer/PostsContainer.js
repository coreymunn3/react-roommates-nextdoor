import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import styles from './postsContainer.module.scss';

const PostsContainer = () => {
  const { locationPosts, isLoading: postsLoading } = useSelector(
    (state) => state.post
  );
  const noPostsYet = locationPosts.length === 0;

  return (
    <div className='my-2'>
      {noPostsYet && (
        <div className={styles.noPostsContainer}>
          <h6 className='text-muted'>There Aren't Any Posts Here Yet!</h6>
        </div>
      )}
      {locationPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
