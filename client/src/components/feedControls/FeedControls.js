import React, { Fragment, useState } from 'react';
// bootstrap
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown, FaFilter } from 'react-icons/fa';
import FeedControlModal from '../feedControlModal/FeedControlModal';
// styles
import styles from './feedcontrols.module.scss';

const FeedControls = () => {
  const [controlOpen, setControlOpen] = useState(false);

  const handleOpen = () => {
    setControlOpen(true);
  };

  return (
    <Fragment>
      <div className={styles.pillContainer}>
        <Button className={styles.pill} variant='light' onClick={handleOpen}>
          <FaFilter />
          <span>{' Sort & Filter'}</span>
        </Button>
      </div>

      <FeedControlModal
        open={controlOpen}
        title={'Sort & Filter Posts'}
        handleClose={() => setControlOpen(false)}
      />
    </Fragment>
  );
};

export default FeedControls;
