import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../inputField/InputField';

const SortPostsForm = () => {
  const sortOptions = ['Newest', 'Most Likes', 'No Sort'];
  const validationSchema = yup.object({});
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
      sortOptionPicked: 'No Sort',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      console.log(values);
    },
  });

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col}>
          <h5>Select Sort Method</h5>
          {sortOptions.map((option) => (
            <Form.Check
              key={option}
              type='radio'
              name='sortOptionPicked'
              label={option}
              value={option}
              checked={values.sortOptionPicked === option}
              onChange={handleChange}
            />
          ))}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group>
          <h5>Select Filters</h5>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SortPostsForm;
