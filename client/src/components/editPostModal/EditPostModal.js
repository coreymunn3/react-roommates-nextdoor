import React from 'react';
import CustomModal from '../customModal/CustomModal';
import PostForm from '../postForm/PostForm';

const EditPostModal = ({ title, open, handleClose, initialValues }) => {
  return (
    <CustomModal title={title} open={open} handleClose={handleClose}>
      <PostForm edit={true} initialValues={initialValues} />
    </CustomModal>
  );
};

export default EditPostModal;
