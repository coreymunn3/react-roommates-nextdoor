import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../redux/postSlice';
import styles from './likeButton.module.scss';

const LikeButton = ({ likeCount, likedBy, postId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLike = () => {
    console.log('liked');
    dispatch(likePost(postId));
  };
  const handleUnlike = () => {
    console.log('unliked');
    dispatch(unlikePost(postId));
  };

  const userLikeThis = likedBy.includes(user?.user?._id);
  return (
    <div className={styles.container}>
      {userLikeThis ? (
        <FaHeart size='1.5rem' className='clickable' onClick={handleUnlike} />
      ) : (
        <FaRegHeart size='1.5rem' className='clickable' onClick={handleLike} />
      )}
      <span className='mx-1'>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
