import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AvatarImage from '../avatarImage/AvatarImage';
import { Image } from 'cloudinary-react';
import moment from 'moment';
import Skeleton from 'react-loading-skeleton';
import styles from './postCard.module.scss';

const PostCard = ({
  post: {
    _id,
    title,
    body,
    featureImage,
    rentMonthly,
    totalMoveInCost,
    datePosted,
    numberOfCohabitants,
    _user,
  },
}) => {
  return (
    <div className={styles.cardSpacing}>
      <Card>
        <Image
          className='card-img'
          publicId={featureImage.public_id}
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          width='400'
          crop='scale'
        />
        <Card.ImgOverlay>
          <AvatarImage avatar={_user?.avatar} width='60px' height='60px' />
          {/* heart button top right */}
        </Card.ImgOverlay>
        <Card.Body>
          <div>
            <Badge
              variant='primary'
              className='mr-1'
            >{`Rent $${rentMonthly}`}</Badge>
            <Badge
              variant='primary'
              className='mr-1'
            >{`Move In $${totalMoveInCost}`}</Badge>
            <Badge
              variant='secondary'
              className='mr-1'
            >{`${numberOfCohabitants} Other Person`}</Badge>
          </div>
          <div className={styles.cardTitle}>
            <h4 className='my-0'>{title}</h4>
            <small className='text-muted'>{moment(datePosted).fromNow()}</small>
          </div>
          <Card.Text>{body}</Card.Text>
          <Button
            as={Link}
            to={`feed/${_id}`}
            variant='success'
            className='shadow-sm'
          >
            See Full Post
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
