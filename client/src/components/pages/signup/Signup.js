import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
// Bootstrap compponents
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
// style
import styles from './signup.module.scss';
// util
import validateSignup from '../../utils/validateSignup';

const Signup = () => {
  const history = useHistory();
  // pull list of locations when component mounts
  const [locations, setLocations] = useState();
  useEffect(() => {
    const getLocations = async () => {
      const { data } = await axios.get('/api/locations');
      setLocations(data);
    };
    getLocations();
    return () => setLoading(null);
  }, []);
  // loading state
  const [loading, setLoading] = useState(false);
  // toast state for handling errors
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // form state
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
  };
  const [newUser, setNewUser] = useState(initialState);

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

  // removes error and closes the toast
  const handleCloseToast = () => {
    setError(null);
    setShowToast(false);
  };

  // submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // perform validation
    const validationErrors = validateSignup(newUser);
    if (validationErrors) {
      setError(validationErrors);
      setShowToast(true);
      setLoading(false);
      return;
    } else {
      // submit data to server and finish sign up
      try {
        const { data } = await axios.post('/auth/signup', newUser);
        if (data.loggedIn) {
          setLoading(false);
          setNewUser(initialState);
          history.push('/home');
        }
      } catch (error) {
        console.log(error.response.data);
        setShowToast(true);
        setError(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <div className={styles.toasts}>
        {error && (
          <Toast
            style={{ position: 'absolute', top: 10, right: 10 }}
            onClose={handleCloseToast}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>Signup Error</Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        )}
      </div>

      <div className={styles.container}>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>UserName</Form.Label>
              <Form.Control
                required
                name='username'
                type='text'
                placeholder='Enter Username'
                value={newUser.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name='password'
                type='password'
                placeholder='Choose Password'
                value={newUser.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId='formGridConfirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                name='confirmPassword'
                type='password'
                placeholder='Confirm Password'
                value={newUser.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>

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

          <Button variant='primary' type='submit' block>
            {loading ? 'Processing...' : 'Sign Up'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signup;
