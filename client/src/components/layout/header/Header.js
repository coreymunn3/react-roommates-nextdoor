import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FaBars, FaUserCircle } from 'react-icons/fa';
// styles
import styles from './header.module.scss';

const Header = () => {
  const iconSize = '1.5rem';
  return (
    <Navbar collapseOnSelect expand='md' bg='light' variant='light'>
      <Container fluid>
        <Navbar.Brand href='#home'>Roommates</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'>
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto flex-grow-1'>
            <Form inline className='w-100'>
              <FormControl
                className={`mr-sm-2 flex-grow-1 ${styles.formControl}`}
                type='text'
                placeholder='Search Listings'
              ></FormControl>
              <Button>Search</Button>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link href='#profile'>
              <span className='mr-1'>Welcome, Corey</span>
              <FaUserCircle size={iconSize} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
