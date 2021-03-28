import React from 'react';
import Container from 'react-bootstrap/Container';
import FeedControls from '../../feedControls/FeedControls';
import { FaSortDown } from 'react-icons/fa';
// redux
import { useSelector } from 'react-redux';
// styles
import styles from './feed.module.scss';

const Feed = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  return (
    <Container>
      {isLoading ? (
        <h3>Loading</h3>
      ) : (
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
          {/* posts */}
        </div>
      )}
    </Container>
  );
};

export default Feed;
