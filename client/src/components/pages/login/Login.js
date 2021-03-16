import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
// Bootstrap compponents
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
// style
import styles from '../signup/signup.module.scss';
// fields to map
import loginFields from './loginFields';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoading, isSuccess, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    console.log(user);
  }, [isSuccess, isError]);

  // form state
  const initialFormState = {
    username: '',
    password: '',
  };
  const [userData, setUserData] = useState(initialFormState);

  // handles form change for all but location
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

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

  return (
    <div className={styles.pageContainer}>
      <div className={styles.alertContainer}>
        {showAlert && (
          <Alert
            variant='danger'
            onClose={() => setShowAlert(false)}
            dismissible
          >
            <p>{`Unable to Log In: ${errorMessage}`}</p>
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
                  value={userData[field.name]}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Row>
          ))}
          <Button variant='primary' type='submit' block disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Log In'}
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
