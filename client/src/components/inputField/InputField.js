import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';

const InputField = ({ label, name, errors, ...rest }) => {
  return (
    <Fragment>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} {...rest}></Form.Control>
      <Form.Control.Feedback type='invalid'>
        {errors[name]}
      </Form.Control.Feedback>
    </Fragment>
  );
};

export default InputField;
