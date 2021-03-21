import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { FaSortAmountDown } from 'react-icons/fa';
import { MdClose, MdAdd } from 'react-icons/md';
// styles
import styles from './feedcontrols.module.scss';
// redux
import { useSelector } from 'react-redux';

const FeedControls = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  return (
    <div>
      <Container className='py-3'>
        <div>
          <h3>{`Recent Posts In City, State`}</h3>
        </div>
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
      </Container>
    </div>
  );
};

export default FeedControls;
