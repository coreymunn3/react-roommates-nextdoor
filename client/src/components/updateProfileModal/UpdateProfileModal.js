import React from 'react';
import UpdatePasswordForm from './UpdatePasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import UpdateAvatarForm from './UpdateAvatarForm';
import CustomModal from '../customModal/CustomModal';

const UpdateProfileModal = ({ open, handleClose, title }) => {
  return (
    <CustomModal
      title={`Update ${title}`}
      open={open}
      handleClose={handleClose}
    >
      {title === 'Password' && <UpdatePasswordForm handleClose={handleClose} />}
      {title === 'Email' && <UpdateEmailForm handleClose={handleClose} />}
      {title === 'Avatar' && <UpdateAvatarForm handleClose={handleClose} />}
    </CustomModal>
  );
};

export default UpdateProfileModal;
