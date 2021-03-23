import React from 'react';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
// components
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import ElevatedSection from '../layout/elevatedSection/ElevatedSection';
// mappable arrays for form options
import { housingOptions, amenities } from './formOptions';
import Button from 'react-bootstrap/esm/Button';

const PostForm = () => {
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
      title: '',
      streetAddress: '',
      body: '',
      housingType: '',
    },
    validationSchema: yup.object({
      title: yup.string().min(5, 'Min 5 Chars').required('Required'),
      streetAddress: yup.string().required('Required'),
      body: yup.string().min(10, 'Min 10 Chars').required('Required'),
      housingType: yup.string().required('Required'),
    }),
    onSubmit: (values) => console.log(values),
  });
  return (
    <ElevatedSection>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md={6} controlId='formGridTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              name='title'
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.title && errors.title}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={6} controlId='formGridTitle'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              name='streetAddress'
              value={values.streetAddress}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.streetAddress && errors.streetAddress}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.streetAddress}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridBody'>
            <Form.Label>Body / Description</Form.Label>
            <Form.Control
              as='textarea'
              name='body'
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Get people interested!'
              rows={4}
              isInvalid={touched.body && errors.body}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.body}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId='formGridHousingType'>
            <Form.Label>Select Housing Type</Form.Label>
            <Form.Control
              as='select'
              name='housingType'
              value={values.housingType}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.housingType && errors.housingType}
              placeholder='Choose'
            >
              <option hidden value>
                Choose Type
              </option>
              {housingOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              {errors.housingType}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Button type='submit' block>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </ElevatedSection>
  );
};

export default PostForm;
