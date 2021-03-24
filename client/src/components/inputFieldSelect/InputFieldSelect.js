import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';

const InputFieldSelect = ({ label, name, error, options, ...rest }) => {
  return (
    <Fragment>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} {...rest}>
        <option hidden value>
          Choose Type
        </option>
        {options.map((opt, idx) => (
          <option key={idx}>{opt}</option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
    </Fragment>
  );
};

export default InputFieldSelect;
