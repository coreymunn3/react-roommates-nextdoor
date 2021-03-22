import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';

const PostForm = () => {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} md={6} controlId='formGridTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter Title' />
        </Form.Group>
        <Form.Group as={Col} md={6} controlId='formGridTitle'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Enter Address' />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId='formGridBody'>
          <Form.Label>Body / Description</Form.Label>
          <Form.Control as='textarea' rows={4} />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default PostForm;
