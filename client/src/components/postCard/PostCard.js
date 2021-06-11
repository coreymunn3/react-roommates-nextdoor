import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AvatarImage from '../avatarImage/AvatarImage';
import LikeButton from '../likeButton/LikeButton';
import EditPostModal from '../editPostModal/EditPostModal';
import DeletePostModal from '../deletePostModal/DeletePostModal';
import { Image, Placeholder } from 'cloudinary-react';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { IoArrowUndo } from 'react-icons/io5';
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
    likeCount,
    likedBy,
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
          loading='lazy'
          crop='scale'
        ></Image>
        <Card.ImgOverlay
          style={{ background: edit ? 'rgba(0,0,0,0.3)' : null }}
        >
          {
            // don't show avatar and like/unlike button if user in in edit state
            !edit ? (
              <div className='d-flex justify-content-between'>
                <AvatarImage avatar={_user?.avatar} />
                <LikeButton
                  likeCount={likeCount}
                  likedBy={likedBy}
                  postId={_id}
                />
              </div>
            ) : (
              // empty div needed for card positioning
              <div></div>
            )
          }

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
        </Card.ImgOverlay>
        <Card.Body className='position-relative'>
          <div>
            <Badge
              variant='secondary'
              className='mr-1'
            >{`Rent $${rentMonthly}`}</Badge>
            <Badge
              variant='secondary'
              className='mr-1'
            >{`Move In $${totalMoveInCost}`}</Badge>
            <Badge
              variant='secondary'
              className='mr-1'
            >{`${numberOfCohabitants} Other Person(s)`}</Badge>
          </div>
          <div className={styles.cardTitle}>
            <h4 className='my-0'>{title}</h4>
            <small className='text-muted'>
              {`Posted ${moment(datePosted).fromNow()}`} &bull;
              {` Move In ${moment(moveInDate).fromNow()}`}
            </small>
          </div>
          <Card.Text>{body}</Card.Text>
          {/* <div>
            <Button
              as={Link}
              to={`feed/${_id}`}
              variant='primary'
              className='mb-2'
            >
              See Full Post
            </Button>
          </div> */}
          <div className={styles.cardLinkContainer}>
            <Link to={`feed/${_id}`} className={styles.cardLink}>
              <IoArrowUndo size='1.5rem' className={styles.arrow} />
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* modals */}
      <EditPostModal
        title={'Edit Listing'}
        open={editModalOpen}
        initialValues={editValues}
        handleClose={() => setEditModalOpen(false)}
        wide
      />
      <DeletePostModal
        title={'Delete Listing'}
        postId={_id}
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default PostCard;
