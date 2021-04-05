import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaBars } from 'react-icons/fa';
// styles
import styles from './header.module.scss';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleLogout = (e) => {
    dispatch(logoutUser());
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
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
            <Form className={styles.headerForm}>
              <div className={styles.searchBarGroup}>
                <div className={styles.searchBarButton}>
                  <Button>Search</Button>
                </div>
                <FormControl
                  className={styles.searchBar}
                  type='text'
                  placeholder='Search Listings'
                />
              </div>
            </Form>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to='/new-post'>
              <Button variant='danger'>New Post</Button>
            </Nav.Link>
            <DropdownButton
              menuAlign='right'
              title={`Hello, ${user?.user?.username}`}
              id='dropdown-menu-align-right'
              variant='outlined'
            >
              <Dropdown.Item
                onClick={handleOpen}
                onSelect={() => console.log('selected')}
              >{`Change Location (${user?.user?._location?.city})`}</Dropdown.Item>
              <Dropdown.Item as={Link} to='/myprofile'>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to='/myposts'>
                My Posts
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to='/login' onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
            <Modal show={open} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Change Current Location</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                By updating the current location, you will which posts appear in
                your feed. For example, by changing your location to 'New York'
                you will only see posts made at or near that geographic
                location.
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
