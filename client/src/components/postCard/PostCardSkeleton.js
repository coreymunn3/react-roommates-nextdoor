import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Card from 'react-bootstrap/Card';
import styles from './postCard.module.scss';

const PostCardSkeleton = () => {
  return (
    <div className='my-3'>
      <Card className='shadow-sm'>
        <div className='card-img'>
          <Skeleton height={325} style={{ borderRadius: '20px' }} />
        </div>
        <Card.Body>
          <div>
            <Skeleton height={18} width={75} style={{ margin: '0 0.25rem' }} />
            <Skeleton height={18} width={75} style={{ margin: '0 0.25rem' }} />
            <Skeleton height={18} width={75} style={{ margin: '0 0.25rem' }} />
          </div>
          <div className={styles.cardTitle}>
            <Skeleton height={52} />
          </div>
          <div className='my-2'>
            <Skeleton count={3} />
          </div>
          <Skeleton width={120} height={36} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCardSkeleton;
