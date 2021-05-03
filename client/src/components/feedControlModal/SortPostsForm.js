import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/postSlice';

const SortPostsForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { activeSort } = useSelector((state) => state.post);
  const sortOptions = ['Newest', 'Most Likes', 'No Sort'];
  const [sortSelection, setSortSelection] = useState(activeSort);

  const handleChange = (e) => {
    setSortSelection(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSort(sortSelection));
    handleClose();
  };

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
              checked={sortSelection === option}
              onChange={handleChange}
            />
          ))}
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Button type='submit'>Sort</Button>
      </Form.Row>
    </Form>
  );
};

export default SortPostsForm;
