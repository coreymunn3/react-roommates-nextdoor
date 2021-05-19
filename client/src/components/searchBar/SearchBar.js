import React, { useState } from 'react';
import styles from './searchBar.module.scss';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
// redux
import { useDispatch } from 'react-redux';
import { searchPosts } from '../../redux/postSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    dispatch(searchPosts(query));
  };

  return (
    <Form className={styles.headerForm} onSubmit={handleSubmit}>
      <div className={styles.searchBarGroup}>
        <div className={styles.searchBarButton}>
          <Button type='submit'>Search Posts</Button>
        </div>
        <FormControl
          className={styles.searchBar}
          type='text'
          placeholder='Search Listings'
          value={query}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
};

export default SearchBar;
