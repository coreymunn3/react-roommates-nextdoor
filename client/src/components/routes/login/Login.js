import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// Bootstrap compponents
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import InputField from '../../inputField/InputField';
// style
import styles from './login.module.scss';
// fields to map
import loginFields from './loginFields';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );

  // alert state & toggle
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (isError) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    if (!isLoading && user?.loggedIn) {
      history.push('/feed');
    }
  }, [isError, user, isLoading]);

  // submit form data
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(userData));
  // };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
    onSubmit: async (values, actions) => {
      dispatch(loginUser(values));
      actions.setSubmitting(false);
    },
  });

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

        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <InputField
                label='Username'
                name='username'
                type='text'
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && formik.errors.username}
                error={formik.errors.username}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <InputField
                label='Password'
                name='password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
                error={formik.errors.password}
              />
            </Form.Group>
          </Form.Row>

          <Button
            variant='primary'
            type='submit'
            block
            disabled={isLoading || formik.isSubmitting}
          >
            {isLoading || formik.isSubmitting ? 'Processing...' : 'Log In'}
          </Button>
          <Form.Text className='text-center'>
            {'Still dont have an account? '}
            <Link to='/signup'>Sign Up</Link>
          </Form.Text>
        </Form>
        {/* <Form onSubmit={handleSubmit} className={styles.form}>
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
        </Form> */}
      </div>
    </div>
  );
};

export default Login;
