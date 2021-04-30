import React, { Fragment, useState, useEffect } from 'react';
// bootstrap
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown, FaFilter } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import FeedControlModal from '../feedControlModal/FeedControlModal';
// styles
import styles from './sortFilterControls.module.scss';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { clearFilter } from '../../redux/postSlice';
import { mapReduxFilterStateToUI } from './filterStateMapping';

const SortFilterControls = () => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state) => state.post);
  // modal state
  const [controlOpen, setControlOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpen = (title) => {
    setModalTitle(title);
    setControlOpen(true);
  };

  const handleClearFilter = (stateKey, stateDefault) => {
    dispatch(clearFilter({ stateKey, stateDefault }));
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
          mapReduxFilterStateToUI(activeFilters).map((filter, idx) => {
            return (
              <Button
                key={idx}
                className={styles.pill}
                onClick={() =>
                  handleClearFilter(filter.stateKey, filter.stateDefault)
                }
              >
                <span>{filter.display}</span> <MdClose />
              </Button>
            );
          })
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

export default SortFilterControls;
