import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../inputField/InputField';

const UpdatePasswordForm = () => {
  //const { user, isLoading } = useSelector((state) => state.user);
  const userValidationSchema = yup.object({
    password: yup.string().required('Required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords Must Match')
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
      password: '',
      confirmPassword: '',
    },
    validationSchema: userValidationSchema,
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
            label='New Password'
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.password && errors.password}
            error={errors.password}
          />
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
      <Button type='submit' className='mx-1'>
        Save Password
      </Button>
      <Button variant='secondary' className='mx-1'>
        Cancel
      </Button>
    </Form>
  );
};

export default UpdatePasswordForm;
