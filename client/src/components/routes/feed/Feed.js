import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import FeedControls from '../../feedControls/FeedControls';
import { FaSortDown } from 'react-icons/fa';
import PostsContainer from '../../postsContainer/PostsContainer';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPosts } from '../../../redux/postSlice';
// styles
import styles from './feed.module.scss';

const Feed = () => {
  const dispatch = useDispatch();
  const { user, isLoading: userLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userLoading && user) {
      dispatch(getFeedPosts(user.user._location._id));
    }
  }, [userLoading]);

  return (
    <div>
      <div className={styles.titleContainer}>
        <h3>{`Recent Posts In ${user?.user?._location?.city}, ${user?.user?._location?.state}`}</h3>
        <FaSortDown
          size='2em'
          className={styles.feedControlToggle}
          onClick={() => console.log('open controls')}
        />
      </div>
      <FeedControls />
      <PostsContainer />
    </div>
  );
};

export default Feed;
