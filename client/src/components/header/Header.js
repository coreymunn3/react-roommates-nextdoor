import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaBars, FaUserCircle } from 'react-icons/fa';
// styles
import styles from './header.module.scss';
// redux
import { useSelector } from 'react-redux';

const Header = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const iconSize = '1.5rem';
  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='white'
      variant='light'
      className='shadow-sm mb-3'
    >
      <Container fluid>
        <Navbar.Brand href='#home'>Roommates</Navbar.Brand>
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
            <NavDropdown
              title={`Hello, ${user?.user?.username}`}
              id='nav-dropdown'
              className={styles.dropdown}
            >
              <NavDropdown.Item href='#'>Profile</NavDropdown.Item>
              <NavDropdown.Item href='#'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
