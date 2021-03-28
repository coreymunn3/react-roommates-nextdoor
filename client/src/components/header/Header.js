import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaBars, FaUserCircle } from 'react-icons/fa';
// styles
import styles from './header.module.scss';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const handleLogout = (e) => {
    dispatch(logoutUser());
  };
  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='white'
      variant='light'
      className='shadow-sm mb-3'
    >
      <Container fluid>
        <Navbar.Brand as={Link} to={'/feed'}>
          Roommates
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'>
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto flex-grow-1'>
            <Form inline className={styles.headerForm}>
              <FormControl
                className={`mr-sm-2 flex-grow-1 ${styles.formControl}`}
                type='text'
                placeholder='Search Listings'
              ></FormControl>
              <Button>Search</Button>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link className={styles.navLink} as={Link} to='/new-post'>
              <Button variant='danger'>New Post</Button>
            </Nav.Link>
            <DropdownButton
              className={styles.navLink}
              menuAlign='right'
              title={`Hello, ${user?.user?.username}`}
              id='dropdown-menu-align-right'
              variant='outlined'
            >
              <Dropdown.Item eventKey='1'>Action</Dropdown.Item>
              <Dropdown.Item eventKey='2'>Another action</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                as={Link}
                to='/login'
                eventKey='4'
                onClick={handleLogout}
              >
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
