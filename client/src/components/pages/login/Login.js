import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
// Bootstrap compponents
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
// style
import styles from '../signup/signup.module.scss';
// util validation
import validateLogin from '../../utils/validateLogin';
// fields
import loginFields from './loginFields';

const Login = () => {
  // loading state
  const [loading, setLoading] = useState(false);
  // alert state for handling errors
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // form state
  const initialFormState = {
    username: '',
    password: '',
  };
  const [user, setUser] = useState(initialFormState);

  // handles form change for all but location
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // submit form data
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // perform validation
    const validationErrors = validateLogin(user);
    if (validationErrors) {
      setError(validationErrors);
      setShowAlert(true);
      setLoading(false);
      return;
    } else {
      // submit data to server and finish sign up
      try {
        const { data } = await axios.post('/auth/login', user);
        if (data.loggedIn) {
          setLoading(false);
          setUser(initialFormState);
          history.push('/home');
        }
      } catch (error) {
        setLoading(false);
        setShowAlert(true);
        setError(error.response.data.error);
      }
    }
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
            <p>{`Unable to Sign Up: ${error}`}</p>
          </Alert>
        )}
      </div>

      <div className={styles.formContainer}>
        <h3 className='text-center'>Log In</h3>
        <Form onSubmit={handleSubmit} className={styles.form}>
          {loginFields.map((field) => (
            <Form.Row key={field.name}>
              <Form.Group as={Col} controlId={field.controlId}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={user[field.name]}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
          ))}
          <Button variant='primary' type='submit' block disabled={loading}>
            {loading ? 'Processing...' : 'Log In'}
          </Button>
          <Form.Text className='text-center'>
            {'Still dont have an account? '}
            <Link to='/signup'>Sign Up</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
};

export default Login;
