import React from 'react';
import { Image } from 'cloudinary-react';
import Card from 'react-bootstrap/esm/Card';
import styles from './postCard.module.scss';

const SimplePostCard = ({ post }) => {
  return (
    <Card className={styles.simpleCard}>
      <Image
        className='card-img'
        publicId={post.featureImage.public_id}
        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
        width='400'
        crop='scale'
      />
      <Card.ImgOverlay style={{ background: 'rgba(0,0,0,0.3)' }}>
        <Card.Title>{post.title}</Card.Title>
        <small>{`Posted By ${post._user[0].username}`}</small>
        <Card.Text>{post.body}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default SimplePostCard;
