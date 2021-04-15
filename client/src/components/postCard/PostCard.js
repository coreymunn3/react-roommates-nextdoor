import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AvatarImage from '../avatarImage/AvatarImage';
import { Image } from 'cloudinary-react';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
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
  edit,
}) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        <Card.ImgOverlay
          style={{ background: edit ? 'rgba(255,255,255,0.5)' : null }}
        >
          <AvatarImage avatar={_user?.avatar} width='60px' height='60px' />
          {edit && (
            <div className='d-flex justify-content-between'>
              <Button variant='outline-warning'>
                <FaEdit className='mb-1' /> <span>Edit</span>
              </Button>
              <Button variant='outline-danger'>
                <FaTrash className='mb-1' /> <span>Delete</span>
              </Button>
            </div>
          )}
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
          <div>
            <Button as={Link} to={`feed/${_id}`} variant='primary'>
              See Full Post
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
