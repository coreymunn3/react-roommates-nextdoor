import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import styles from './postsContainer.module.scss';

const PostsContainer = () => {
  const { feedPosts, isLoading: postsLoading } = useSelector(
    (state) => state.post
  );
  const noPostsYet = feedPosts.length === 0;

  return (
    <div className='my-2'>
      {noPostsYet && (
        <div className={styles.noPostsContainer}>
          <h6 className='text-muted'>There Aren't Any Posts Here Yet!</h6>
        </div>
      )}
      {feedPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostsContainer;
