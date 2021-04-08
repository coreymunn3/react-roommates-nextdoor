import React from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import CustomModal from '../customModal/CustomModal';

const UpdateProfileModal = ({ open, handleClose, title }) => {
  return (
    <CustomModal
      title={`Update ${title}`}
      open={open}
      handleClose={handleClose}
    >
      {title === 'Password' && <UpdatePasswordForm />}
      {title === 'Email' && <UpdateEmailForm />}
    </CustomModal>
  );
};

export default UpdateProfileModal;
