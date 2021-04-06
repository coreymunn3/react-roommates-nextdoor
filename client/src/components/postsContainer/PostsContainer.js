import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import PostCardSkeleton from '../postCard/PostCardSkeleton';
import styles from './postsContainer.module.scss';

const NoPostsYet = () => {
  return (
    <div className={styles.noPostsContainer}>
      <h6 className='text-muted'>No Posts Here Yet!</h6>
    </div>
  );
};

const PostsContainer = () => {
  const { locationPosts, isLoading: postsLoading } = useSelector(
    (state) => state.post
  );

  return (
    <div className='my-2'>
      {postsLoading && (
        <div>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      )}
      {!postsLoading && locationPosts?.length === 0 ? (
        <NoPostsYet />
      ) : (
        locationPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default PostsContainer;
