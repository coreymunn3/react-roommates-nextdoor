import React, { useEffect } from 'react';
import FeedControls from '../../sortFilterControls/SortFilterControls';
import PostsContainer from '../../postsContainer/PostsContainer';
import FeedControlToggle from '../../feedControlToggle/FeedControlToggle';
import Accordion from 'react-bootstrap/Accordion';
import FeedHeaderSkeleton from './FeedHeaderSkeleton';
import SearchBar from '../../searchBar/SearchBar';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getPostsByLocation } from '../../../redux/postSlice';
// styles
import styles from './feed.module.scss';

const Feed = () => {
  const dispatch = useDispatch();
  const { user, isLoading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userLoading && user?.loggedIn) {
      dispatch(getPostsByLocation(user.user._location._id));
    }
  }, [userLoading]);

  return (
    <div>
      <div className={styles.titleContainer}>
        <Accordion className={styles.accordionContainer}>
          <div className={styles.accordionTitle}>
            <h3>
              {userLoading ? (
                <FeedHeaderSkeleton />
              ) : (
                `Recent Posts In ${user?.user?._location?.city}, ${user?.user?._location?.state}`
              )}
            </h3>
            <FeedControlToggle eventKey='0' />
          </div>
          <Accordion.Collapse eventKey='0'>
            <FeedControls />
          </Accordion.Collapse>
        </Accordion>
      </div>
      <SearchBar />
      <PostsContainer />
    </div>
  );
};

export default Feed;
