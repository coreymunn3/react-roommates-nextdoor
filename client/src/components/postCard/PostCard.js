import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './postCard.module.scss';

const PostCard = ({ post: { title, body, featureImage } }) => {
  return (
    <div className='my-2'>
      <Card className='shadow'>
        <Card.Img src={featureImage} alt='featureImage' />
        {/* <Card.ImgOverlay>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay> */}
        <Card.Body>
          <div className={styles.cardTitle}>
            <h4 className='my-0'>{title}</h4>
            <small className='text-muted'>4 Days ago</small>
          </div>
          <Card.Text>{body}</Card.Text>
          <Button variant='success'>See Full Post</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
