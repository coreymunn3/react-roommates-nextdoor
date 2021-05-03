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
  const [selectedFilters, setSelectedFilters] = useState(activeFilters);

  // change handlers
  const handleFieldChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.value,
    });
  };
  const handleAmenityChange = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.checked,
    });
  };
  const handleHousingTypeChange = (e) => {
    const option = e.target.name;
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
  // reset form to default
  const resetFormFields = () => {
    setSelectedFilters({
      rentMonthly: 0,
      housingType: [],
      hasPrivateBath: false,
      hasFurnishedRoom: false,
      hasParkingIncluded: false,
      hasWasherDryerInUnit: false,
      hasPetsAllowed: false,
      hasWifi: false,
      hasCableTelevision: false,
      hasKitchenAccess: false,
      hasPoolAccess: false,
      hasDrugTolerantCohabitants: false,
    });
  };
  // submit
  const handleSubmit = (e) => {
    e.preventDefault();
    selectedFilters.rentMonthly = parseInt(selectedFilters.rentMonthly);
    dispatch(setFilter(selectedFilters));
  };

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
              name={option}
              label={option}
              checked={selectedFilters.housingType.includes(option)}
              onChange={handleHousingTypeChange}
            />
          ))}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col}>
          <h6>Desired Amenities</h6>
          {amenitiesOptions.map((option) => (
            <Form.Check
              key={option.name}
              type='checkbox'
              name={option.name}
              label={option.label}
              checked={selectedFilters[option.name]}
              onChange={handleAmenityChange}
            />
          ))}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Button type='submit' onClick={handleClose}>
          Submit
        </Button>
        <Button variant='light' className='mx-2' onClick={resetFormFields}>
          Reset Form
        </Button>
      </Form.Row>
    </Form>
  );
};

export default FilterPostsForm;
