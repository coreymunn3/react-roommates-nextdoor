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
import InputFieldSelect from '../../inputFieldSelect/InputFieldSelect';
// style - using same style as signup
import styles from './signup.module.scss';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  signupUser,
  checkUsernameAvailability,
} from '../../../redux/userSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );
  const { locations } = useSelector((state) => state.location);

  // alert state & toggle
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (isError) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
    if (user?.loggedIn) {
      history.push('/feed');
    }
  }, [isError, user, isLoading]);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .max(25, 'Cannot be more than 25 characters')
        .test({
          name: 'isAvailable',
          message: `username is not available`,
          test: async (value, testContext) =>
            (await checkUsernameAvailability(value)).available === true,
        })
        .required('Required'),
      email: yup
        .string()
        .email('Please Enter a Valid Email')
        .required('Required'),
      password: yup
        .string()
        .min(8, 'Must be at least 8 characters')
        .max(20, 'Cannot be more than 20 characters')
        .required('Required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords Must Match')
        .required('Required'),
      location: yup.string().required('Required'),
    }),
    onSubmit: async (values, actions) => {
      dispatch(signupUser(values));
      actions.setSubmitting(false);
    },
  });

  // useEffect(() => {
  //   console.log(formik.values);
  //   console.log(formik.errors);
  // }, [formik.values, formik.errors]);

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

      <div className={`${styles.formContainer} shadow`}>
        <h3 className='text-center'>Sign Up</h3>

        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <InputField
                label='Username'
                type='text'
                name='username'
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
                label='Email'
                type='text'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && formik.errors.email}
                error={formik.errors.email}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <InputField
                label='Password'
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && formik.errors.password}
                error={formik.errors.password}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <InputField
                label='Confirm Password'
                type='password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                error={formik.errors.confirmPassword}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <InputFieldSelect
                label='Choose Location'
                as='select'
                name='location'
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.location && formik.errors.location}
                error={formik.errors.location}
                options={locations.map(
                  (location) => `${location.city},${location.state}`
                )}
              />
            </Form.Group>
          </Form.Row>

          <Button
            variant='primary'
            type='submit'
            block
            disabled={isLoading || formik.isSubmitting}
          >
            {isLoading || formik.isSubmitting ? 'Processing...' : 'Sign Up'}
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
