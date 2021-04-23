import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AvatarImage from '../avatarImage/AvatarImage';
import EditPostModal from '../editPostModal/EditPostModal';
import DeletePostModal from '../deletePostModal/DeletePostModal';
import { Image } from 'cloudinary-react';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './postCard.module.scss';
import { useSelector } from 'react-redux';

const PostCard = ({
  post: {
    _id,
    title,
    body,
    featureImage,
    rentMonthly,
    totalMoveInCost,
    datePosted,
    moveInDate,
    numberOfCohabitants,
    _user,
  },
  edit,
}) => {
  const { userPosts } = useSelector((state) => state.post);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editValues, setEditValues] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditOpen = () => {
    const targetPost = userPosts.filter((post) => _id === post._id);
    setEditValues(targetPost[0]);
    setEditModalOpen(true);
  };

  const handleDeleteOpen = () => {
    setDeleteModalOpen(true);
  };

  return (
    <div className={styles.cardSpacing}>
      <Card className='shadow'>
        <Image
          className='card-img'
          publicId={featureImage.public_id}
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          width='400'
          crop='scale'
        />
        <Card.ImgOverlay
          style={{ background: edit ? 'rgba(0,0,0,0.3)' : null }}
        >
          <AvatarImage avatar={_user?.avatar} width='60px' height='60px' />
          {
            /* only render buttons on overlay when edit state is true */
            edit && (
              <div className='d-flex justify-content-between'>
                <Button variant='outline-warning' onClick={handleEditOpen}>
                  <FaEdit className='mb-1' /> <span>Edit</span>
                </Button>
                <Button variant='outline-danger' onClick={handleDeleteOpen}>
                  <FaTrash className='mb-1' /> <span>Delete</span>
                </Button>
              </div>
            )
          }
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
            <small className='text-muted'>
              {`Posted ${moment(datePosted).fromNow()}`} &bull;
              {` Move In ${moment(moveInDate).fromNow()}`}
            </small>
          </div>
          <Card.Text>{body}</Card.Text>
          <div>
            <Button
              as={Link}
              to={`feed/${_id}`}
              variant='primary'
              className='mb-2'
            >
              See Full Post
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* modals */}
      <EditPostModal
        title={'Edit Listing'}
        open={editModalOpen}
        initialValues={editValues}
        handleClose={() => setEditModalOpen(false)}
      />
      <DeletePostModal
        title={'Delete Listing'}
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default PostCard;
