import React, { Fragment, useState } from 'react';
// bootstrap
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown, FaFilter } from 'react-icons/fa';
import FeedControlModal from '../feedControlModal/FeedControlModal';
// styles
import styles from './feedcontrols.module.scss';

const FeedControls = () => {
  const [controlOpen, setControlOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpen = (title) => {
    setModalTitle(title);
    setControlOpen(true);
  };

  return (
    <Fragment>
      <div className={styles.pillContainer}>
        <Button
          className={styles.pill}
          variant='light'
          onClick={() => handleOpen('Sort')}
        >
          <FaSortAmountDown />
          <span>{' Sort Posts'}</span>
        </Button>
        {/* Select activeFiltes array from state and Map active filters & sorts methods in same pill container as pills that are primary colors. */}
      </div>
      <div className={styles.pillContainer}>
        <Button
          className={styles.pill}
          variant='light'
          onClick={() => handleOpen('Filter')}
        >
          <FaFilter />
          <span>{' Filter Posts'}</span>
        </Button>
        {/* Select activeFiltes array from state and Map active filters & sorts methods in same pill container as pills that are primary colors. */}
      </div>

      <FeedControlModal
        open={controlOpen}
        title={modalTitle}
        handleClose={() => setControlOpen(false)}
      />
    </Fragment>
  );
};

export default FeedControls;
