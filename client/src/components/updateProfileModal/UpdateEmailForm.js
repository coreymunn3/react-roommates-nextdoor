import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../inputField/InputField';

const UpdateEmailForm = () => {
  //const { user, isLoading } = useSelector((state) => state.user);
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
    values,
    touched,
    isValid,
    errors,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
    },
  });
  useEffect(() => {
    console.log(values);
    console.log(errors);
    console.log(isValid);
  }, [values, errors]);

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
      <Button type='submit' className='mx-1'>
        Save Email
      </Button>
      <Button variant='secondary' className='mx-1'>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateEmailForm;
