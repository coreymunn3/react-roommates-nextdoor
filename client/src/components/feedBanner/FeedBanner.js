import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import { FaSortAmountDown } from 'react-icons/fa';
// styles
import styles from './feedbanner.module.scss';
// redux
import { useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/esm/Dropdown';

const FeedBanner = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  return (
    <div className='bg-light'>
      <Container className='py-3'>
        <Row>
          <Col md='7' className={styles.bannerTitle}>
            <h3 className='my-0'>{`Recent Posts In City, State`}</h3>
          </Col>
          <Col md='5' className={styles.settingsContainer}>
            <Button className='mx-1'>
              <FaSortAmountDown />
              {' Newest'}
            </Button>
            <Button className='mx-1'>
              <FaSortAmountDown />
              {' Likes'}
            </Button>
            <DropdownButton id='filter' title='Filter' className='mx-1'>
              <Dropdown.Item>One</Dropdown.Item>
              <Dropdown.Item>Two</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeedBanner;
