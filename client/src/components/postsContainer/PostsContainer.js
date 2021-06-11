import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postCard/PostCard';
import PostCardSkeleton from '../postCard/PostCardSkeleton';
import { filterAndSortPosts } from './filterAndSortPosts';
import styles from './postsContainer.module.scss';

const NoPostsYet = () => {
  return (
    <div className={styles.noPostsContainer}>
      <h6 className='text-light'>No Posts Here Yet!</h6>
    </div>
  );
};

const PostsContainer = () => {
  const {
    locationPosts,
    activeFilters,
    activeSort,
    activeSearch,
    isLoading: postsLoading,
  } = useSelector((state) => state.post);
  const [postsInFeed, setPostsInFeed] = useState(locationPosts);

  // use posts from location & activeFilters to determine
  // which posts appear in the feed
  useEffect(() => {
    // step 1 - determine what should be in the feed
    if (activeSearch.query) {
      setPostsInFeed(
        filterAndSortPosts(activeSearch.results, activeFilters, activeSort)
      );
    } else {
      setPostsInFeed(
        filterAndSortPosts(locationPosts, activeFilters, activeSort)
      );
    }
  }, [locationPosts, activeFilters, activeSort, activeSearch]);

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
