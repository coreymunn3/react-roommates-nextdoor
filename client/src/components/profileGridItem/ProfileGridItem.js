import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Skeleton from 'react-loading-skeleton';

import styles from './profileGridItem.module.scss';

const ProfileGridItem = ({
  profileDataItem: { property, value, icon },
  isLoading,
}) => {
  return (
    <Row className='py-3'>
      <Col sm={6} className={styles.profileGroupTitle}>
        {icon}
        <h4 className='my-0 mx-1'>{property}</h4>
      </Col>
      <Col sm={6} className={styles.profileGridValue}>
        <h5 className='text-primary my-0'>
          {isLoading ? <Skeleton /> : value}
        </h5>
      </Col>
    </Row>
  );
};

export default ProfileGridItem;
