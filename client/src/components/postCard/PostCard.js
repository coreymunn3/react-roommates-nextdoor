import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
import styles from './postCard.module.scss';

const PostCard = ({
  post: {
    _id,
    title,
    body,
    featureImage,
    rentMonthly,
    securityDeposit,
    totalMoveInCost,
    datePosted,
    numberOfCohabitants,
  },
}) => {
  return (
    <div className='my-3'>
      <Card className='shadow-sm'>
        <Card.Img src={featureImage} alt='featureImage' />
        {/* <Card.ImgOverlay>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{body}</Card.Text>
          <Card.Text>Last updated 3 mins ago</Card.Text>
        </Card.ImgOverlay> */}
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
