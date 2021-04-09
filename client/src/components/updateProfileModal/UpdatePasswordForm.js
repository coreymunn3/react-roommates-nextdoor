import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../inputField/InputField';
// redux
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/userSlice';

const UpdatePasswordForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const userValidationSchema = yup.object({
    password: yup
      .string()
      .min(8, 'Must be at least 8 characters')
      .max(20, 'Cannot be more than 20 characters')
      .required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords Must Match')
      .required('Required'),
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setSubmitting,
    values,
    touched,
    isValid,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: userValidationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      dispatch(updateProfile(values));
      setSubmitting(false);
      handleClose();
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <InputField
            label='New Password'
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.password && errors.password}
            error={errors.password}
          />
          <Form.Text className='text-muted'>
            Passwords must be at least 8 but no more than 20 characters in
            length
          </Form.Text>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <InputField
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.confirmPassword && errors.confirmPassword}
            error={errors.confirmPassword}
          />
        </Form.Group>
      </Form.Row>
      <Button type='submit' className='mx-1' disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Password'}
      </Button>
    </Form>
  );
};

export default UpdatePasswordForm;
