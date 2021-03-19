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
// redux
import { useSelector } from 'react-redux';

const Header = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const iconSize = '1.5rem';
  return (
    <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
      <Container>
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
            <Nav.Link href='#profile' className='text-primary'>
              <span className='mr-1 text-capitalize'>
                {isLoading ? 'Hello, Guest' : `Hello, ${user?.user?.username}`}
              </span>
              <FaUserCircle size={iconSize} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
