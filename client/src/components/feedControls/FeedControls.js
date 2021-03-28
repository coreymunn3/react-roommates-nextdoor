import React, { Fragment } from 'react';
// bootstrap
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown } from 'react-icons/fa';
import { MdClose, MdAdd } from 'react-icons/md';
// styles
import styles from './feedcontrols.module.scss';

const FeedControls = () => {
  return (
    <Fragment>
      <div className={styles.pillContainer}>
        <Button className={styles.pill} variant='light'>
          <FaSortAmountDown />
          {' Newest'}
        </Button>
        <Button className={styles.pill}>
          <FaSortAmountDown />
          {' Likes'}
        </Button>
      </div>
      <div className={styles.pillContainer}>
        <Button className={styles.pill} variant='light'>
          <span>Add Filters</span>
          <MdAdd />
        </Button>
        <Button className={styles.pill}>
          <span>Price</span>
          <MdClose />
        </Button>
        <Button className={styles.pill}>
          <span>Location</span>
          <MdClose />
        </Button>
        <Button className={styles.pill}>
          <span>Location</span>
          <MdClose />
        </Button>
      </div>
    </Fragment>
  );
};

export default FeedControls;
