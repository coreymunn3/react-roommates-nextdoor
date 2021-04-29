import React, { Fragment, useState, useEffect } from 'react';
// bootstrap
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown, FaFilter } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import FeedControlModal from '../feedControlModal/FeedControlModal';
// styles
import styles from './feedcontrols.module.scss';
// redux
import { useSelector } from 'react-redux';

import { createFilterPills } from '../../utils/filterUtils';

const FeedControls = () => {
  const { activeFilters } = useSelector((state) => state.post);
  // modal state
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
        {
          /* Select activeFiltes array from state and Map active filters & sorts methods in same pill container as pills that are primary colors. */
          createFilterPills(activeFilters).map((filter) => (
            <Button key={filter} className={styles.pill}>
              <span>{filter}</span> <MdClose />
            </Button>
          ))
        }
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
