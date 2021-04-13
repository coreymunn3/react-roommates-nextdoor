import React, { Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import FileBase64 from 'react-file-base64';

const InputFile = ({ label, name, error, touched, ...rest }) => {
  return (
    <Fragment>
      <Form.Label>{label}</Form.Label>
      <FileBase64 name={name} {...rest} />
      <Form.Text style={{ color: 'red' }}>{touched && error}</Form.Text>
    </Fragment>
  );
};

export default InputFile;
