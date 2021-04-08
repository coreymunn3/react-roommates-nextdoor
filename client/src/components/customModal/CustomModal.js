import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CustomModal = ({ title, open, handleClose, children }) => {
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
