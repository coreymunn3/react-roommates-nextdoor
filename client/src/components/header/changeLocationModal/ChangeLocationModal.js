import React, { useState } from 'react';
import CustomModal from '../../customModal/CustomModal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// redux
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../redux/userSlice';

const ChangeLocationModal = ({ user, locations, open, handleClose }) => {
  const dispatch = useDispatch();
  const [newUserLocation, setNewUserLocation] = useState(null);
  const isDisabled = newUserLocation === null;
  const handleChange = (e) => {
    setNewUserLocation(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(updateProfile({ _location: newUserLocation }));
    setNewUserLocation(null);
    handleClose();
  };
  return (
    <CustomModal
      title='Update Current Location?'
      open={open}
      handleClose={() => {
        setNewUserLocation(null);
        handleClose();
      }}
    >
      <p>
        By updating the current location, you will which posts you see. Only
        posts where the location of the property is in or near the chosen city
        will appear in your feed.
      </p>
      <Form>
        <Form.Group>
          <Form.Control as='select' onChange={handleChange}>
            <option value={0} hidden>
              Choose New Location
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
      <Button block disabled={isDisabled} onClick={handleSubmit}>
        Save Changes
      </Button>
    </CustomModal>
  );
};

export default ChangeLocationModal;
