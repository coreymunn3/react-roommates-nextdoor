import React from 'react';
import CustomModal from '../customModal/CustomModal';
import Button from 'react-bootstrap/Button';
import styles from './deletePostModal.module.scss';

const DeletePostModal = ({ title, open, handleClose }) => {
  return (
    <CustomModal title={title} open={open} handleClose={handleClose}>
      <h5 className='text-center'>Are You Sure?</h5>
      <div className={styles.buttonGroup}>
        <Button className={styles.modalButton} variant='danger'>
          Yes, Delete This Listing
        </Button>
        <Button
          className={styles.modalButton}
          onClick={handleClose}
          variant='light'
        >
          No, Take Me Back
        </Button>
      </div>
    </CustomModal>
  );
};

export default DeletePostModal;
