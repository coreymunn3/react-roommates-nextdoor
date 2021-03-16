import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
// Bootstrap compponents
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
// style - using same style as signup
import styles from './signup.module.scss';
// fields
import signupFields from './signupFields';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../../redux/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    console.log(user);
  }, [isSuccess, isError]);

  // pull list of locations when component mounts
  const [locations, setLocations] = useState();
  useEffect(() => {
    const getLocations = async () => {
      const { data } = await axios.get('/api/locations');
      setLocations(data);
    };
    getLocations();
  }, []);

  // alert state & toggle
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (isError) {
      setShowAlert(true);
    }
    if (!isError) {
      setShowAlert(false);
    }
    if (isSuccess) {
      history.push('/home');
    }
  }, [isError, isSuccess, isLoading]);

  // form state
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
  };
  const [newUser, setNewUser] = useState(initialFormState);

  // handles form change for all but location
  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };
  // handles form change for location
  const handleSetLocation = (e) => {
    const chosenLocation = locations.filter(
      (location) => location._id === e.target.value
    );
    setNewUser({
      ...newUser,
      city: chosenLocation[0].city,
      state: chosenLocation[0].state,
    });
  };

  // submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signupUser(newUser));
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.alertContainer}>
        {showAlert && (
          <Alert
            variant='danger'
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <p>{`Unable to Sign Up: ${errorMessage}`}</p>
          </Alert>
        )}
      </div>

      <div className={styles.formContainer}>
        <h3 className='text-center'>Sign Up</h3>
        <Form onSubmit={handleSubmit} className={styles.form}>
          {signupFields.map((field) => (
            <Form.Row key={field.name}>
              <Form.Group as={Col} controlId={field.controlId}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={newUser[field.name]}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
          ))}

          <Form.Row>
            <Form.Group as={Col} controlId='formLocation'>
              <Form.Label>Select Your Location</Form.Label>
              <Form.Control
                required
                name='location'
                as='select'
                defaultValue={0}
                value={newUser.location}
                onChange={handleSetLocation}
              >
                <option value={0} disabled>
                  Choose...
                </option>
                {locations &&
                  locations.map(({ _id, city, state }) => (
                    <option key={_id} value={_id}>{`${city}, ${state}`}</option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant='primary' type='submit' block disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Sign Up'}
          </Button>
          <Form.Text className='text-center'>
            {'Already have an account? '}
            <Link to='/login'>Log In</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
