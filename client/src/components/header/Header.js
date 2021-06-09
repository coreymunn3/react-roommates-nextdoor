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
import { FaBars } from 'react-icons/fa';
import ChangeLocationModal from '../changeLocationModal/ChangeLocationModal';
import logo from '../../img/logo.png';
// styles
import styles from './header.module.scss';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { locations } = useSelector((state) => state.location);
  const handleLogout = (e) => {
    dispatch(logoutUser());
  };
  // ChangeLocationModal state & handlers
  const [open, setOpen] = useState(false);
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
          <img src={logo} className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'>
          <FaBars />
        </Navbar.Toggle>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto flex-grow-1'></Nav>
          {user?.loggedIn && (
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
                  onSelect={() => console.log('selected')}
                  disabled
                >{`Current Location: ${user?.user?._location?.city}`}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleOpen}>
                  Change Location
                </Dropdown.Item>
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

              <ChangeLocationModal
                user={user}
                locations={locations}
                open={open}
                handleClose={handleClose}
              />
            </Nav>
          )}
          {!user?.loggedIn && (
            <Nav>
              <Nav.Link as={Link} to='/signup'>
                <Button>Sign Up</Button>
              </Nav.Link>
              <Nav.Link as={Link} to='/login'>
                <Button variant='outline-primary'>Log In</Button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
