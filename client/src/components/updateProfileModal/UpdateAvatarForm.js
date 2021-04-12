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

const UpdateAvatarForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const validationSchema = yup.object({
    avatar: yup.string().required('Required'),
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
      avatar: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
      // dispatch(updateProfile(values));
      // setSubmitting(false);
      // handleClose();
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <InputField
            label='Choose Avatar'
            type='text'
            name='avatar'
            value={values.avatar}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.avatar && errors.avatar}
            error={errors.avatar}
          />
        </Form.Group>
      </Form.Row>
      <Button type='submit' className='mx-1' disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save Avatar'}
      </Button>
    </Form>
  );
};

export default UpdateAvatarForm;
