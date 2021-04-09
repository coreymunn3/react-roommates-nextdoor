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

const UpdateEmailForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Required'),
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setSubmitting,
    resetForm,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
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
            label='New Email'
            type='text'
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.email && errors.email}
            error={errors.email}
          />
        </Form.Group>
      </Form.Row>
      <Button type='submit' className='mx-1' disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Email'}
      </Button>
    </Form>
  );
};

export default UpdateEmailForm;
