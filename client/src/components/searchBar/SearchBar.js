import React, { useState, useEffect } from 'react';
import styles from './searchBar.module.scss';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaSearch } from 'react-icons/fa';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts, clearSearch } from '../../redux/postSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const { activeSearch, isLoading } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);

  // synchronize with redux active search state
  // (useful when user does search then navigates away from feed)
  useEffect(() => {
    if (activeSearch.query) {
      setQuery(activeSearch.query);
    }
  }, []);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchOrClear = (e) => {
    e.preventDefault();
    if (activeSearch.query) {
      dispatch(clearSearch());
      setQuery('');
    } else {
      console.log(query);
      dispatch(searchPosts(query));
    }
  };

  return (
    <Form className={styles.headerForm}>
      <div className={styles.searchBarGroup}>
        <div className={styles.searchBarButton}>
          <Button
            style={{ height: '38px' }}
            disabled={query === ''}
            onClick={handleSearchOrClear}
            variant='outline-primary'
          >
            <FaSearch />
            <span>{`${
              activeSearch.query ? ' Clear Search' : ' Search Posts'
            }`}</span>
          </Button>
        </div>
        <FormControl
          className={`${styles.searchBar} ${focused && 'shadow'}`}
          onFocus={onFocus}
          onBlur={onBlur}
          type='text'
          placeholder='Find the Perfect Listing'
          value={query}
          onChange={handleChange}
        />
      </div>
    </Form>
  );
};

export default SearchBar;
