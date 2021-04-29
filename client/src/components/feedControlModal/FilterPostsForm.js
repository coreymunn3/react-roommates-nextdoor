import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {
  housingOptions,
  privacyOptions,
  amenitiesOptions,
} from '../postForm/formOptions';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/postSlice';

const FilterPostsForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state) => state.post);
  console.log(activeFilters);
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  // change handlers
  const handleFieldChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.value,
    });
  };
  const handleHousingTypeChange = (e) => {
    const option = e.target.id;
    if (selectedFilters.housingType.includes(option)) {
      const filtered = selectedFilters.housingType.filter(
        (type) => type !== option
      );
      setSelectedFilters({
        ...selectedFilters,
        housingType: filtered,
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        housingType: [...selectedFilters.housingType, option],
      });
    }
  };
  const resetFields = () => {
    setSelectedFilters({
      rentMonthly: 0,
      housingType: [],
    });
  };
  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    selectedFilters.rentMonthly = parseInt(selectedFilters.rentMonthly);
    dispatch(setFilter(selectedFilters));
  };
  useEffect(() => {
    console.log(selectedFilters);
  }, [selectedFilters]);
  return (
    <Form onSubmit={handleSubmit}>
      <h6>Desired Max Rent Price</h6>
      <Form.Row>
        <Form.Group as={Col} xs='9' className='d-flex align-items-center'>
          <Form.Control
            value={selectedFilters.rentMonthly}
            name='rentMonthly'
            type='range'
            onChange={handleFieldChange}
            min={0}
            max={10000}
          />
        </Form.Group>
        <Form.Group as={Col} xs='3'>
          <Form.Control
            value={selectedFilters.rentMonthly}
            name='rentMonthly'
            onChange={handleFieldChange}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <h6>Desired Housing Type</h6>
          {housingOptions.map((option) => (
            <Form.Check
              key={option}
              type='checkbox'
              id={option}
              label={option}
              checked={selectedFilters.housingType.includes(option)}
              onChange={handleHousingTypeChange}
            />
          ))}
        </Form.Group>
      </Form.Row>
      <Button type='submit' onClick={handleClose}>
        Submit
      </Button>
      <Button variant='light' className='mx-2' onClick={resetFields}>
        Reset Filters
      </Button>
    </Form>
  );
};

export default FilterPostsForm;
