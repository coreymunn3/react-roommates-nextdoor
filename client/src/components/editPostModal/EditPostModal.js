import React from 'react';
import CustomModal from '../customModal/CustomModal';
import PostForm from '../postForm/PostForm';

const EditPostModal = ({ initialValues, ...props }) => {
  return (
    <CustomModal {...props}>
      <PostForm edit={true} initialValues={initialValues} />
    </CustomModal>
  );
};

export default EditPostModal;
