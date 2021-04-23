import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './customModal.module.scss';

const CustomModal = ({ title, open, handleClose, wide, children }) => {
  return (
    <Modal
      show={open}
      onHide={handleClose}
      dialogClassName={wide ? styles.modalWide : styles.modalStandard}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
