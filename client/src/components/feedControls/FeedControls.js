import React, { Fragment } from 'react';
// bootstrap
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown, FaFilter } from 'react-icons/fa';
import { MdClose, MdAdd } from 'react-icons/md';
// styles
import styles from './feedcontrols.module.scss';

const FeedControls = () => {
  return (
    <Fragment>
      <div className={styles.pillContainer}>
        <Button className={styles.pill} variant='light'>
          <FaSortAmountDown />
          <span> Newest</span>
        </Button>
        <Button className={styles.pill}>
          <FaSortAmountDown />
          <span> Likes</span>
        </Button>
      </div>
      <div className={styles.pillContainer}>
        <Button className={styles.pill} variant='light'>
          <FaFilter />
          <span> Add Filters</span>
          <MdAdd />
        </Button>
        <Button className={styles.pill}>
          <span>Price</span>
          <MdClose />
        </Button>
      </div>
    </Fragment>
  );
};

export default FeedControls;
