import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import PostCardSkeleton from '../postCard/PostCardSkeleton';
import filterPosts from '../../utils/filterPosts';
import styles from './postsContainer.module.scss';

const NoPostsYet = () => {
  return (
    <div className={styles.noPostsContainer}>
      <h6 className='text-muted'>No Posts Here Yet!</h6>
    </div>
  );
};

const PostsContainer = () => {
  const [postsInFeed, setPostsInFeed] = useState([]);
  const { locationPosts, activeFilters, isLoading: postsLoading } = useSelector(
    (state) => state.post
  );

  // user posts from location & activeFilters to determine
  // which posts appear in the feed
  useEffect(() => {
    setPostsInFeed(filterPosts(locationPosts, activeFilters));
  }, [locationPosts, activeFilters]);

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
        postsInFeed.map((post) => (
          <PostCard key={post._id} post={post} edit={false} />
        ))
      )}
    </div>
  );
};

export default PostsContainer;
