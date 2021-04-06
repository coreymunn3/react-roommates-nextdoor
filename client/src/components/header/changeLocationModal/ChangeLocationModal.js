import React, { useState } from 'react';
import CustomModal from '../../customModal/CustomModal';
import Form from 'react-bootstrap/Form';

const ChangeLocationModal = ({ user, locations, open, handleClose }) => {
  return (
    <CustomModal
      title='Change Current Location'
      open={open}
      handleClose={handleClose}
    >
      <p>
        By updating the current location, you will which posts you see. Only
        posts where the location of the property is in or near the chosen city
        will appear in your feed.
      </p>
      <Form>
        <Form.Group>
          <Form.Label>Select Location</Form.Label>
          <Form.Control as='select'>
            <option hidden value={user?.user?._location?._id}>
              {`${user?.user?._location?.city}, ${user?.user?._location?.state}`}
            </option>
            {locations.map((location) => (
              <option
                key={location._id}
                value={location._id}
              >{`${location.city}, ${location.state}`}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </CustomModal>
  );
};

export default ChangeLocationModal;
