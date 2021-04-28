import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputField from '../inputField/InputField';

const FilterPostsForm = () => {
  const [maxPrice, setMaxPrice] = useState(0);
  const [housingType, setHousingType] = useState([]);

  const handleSubmit = () => {};
  useEffect(() => {
    console.log(maxPrice);
  }, [maxPrice]);
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <h6>Max Rent Price</h6>
        <Form.Group as={Col} xs='9' className='d-flex align-items-center'>
          <Form.Control
            value={maxPrice}
            type='range'
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
            max={10000}
          />
        </Form.Group>
        <Form.Group as={Col} xs='3'>
          <Form.Control
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default FilterPostsForm;
