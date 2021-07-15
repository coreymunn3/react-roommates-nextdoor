import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
// Bootstrap compponents
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputField from '../../inputField/InputField';
// style
import styles from './login.module.scss';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/userSlice';
import { addToast, clearToast } from '../../../redux/toastSlice';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isLoading, isError, errorMessage } = useSelector(
    (state) => state.user
  );

  // alert state & toggle
  useEffect(() => {
    if (isError) {
      // setShowAlert(true);
      dispatch(
        addToast({
          id: 31,
          status: 0,
          message: errorMessage,
        })
      );
    } else {
      // setShowAlert(false);
      dispatch(clearToast(31));
    }
    if (!isLoading && user?.loggedIn) {
      dispatch(
        addToast({
          id: 32,
          status: 1,
          message: 'You are Logged In',
        })
      );
      history.push('/feed');
    }
  }, [isError, user, isLoading]);

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
      </div>
    </div>
  );
};

export default Login;
