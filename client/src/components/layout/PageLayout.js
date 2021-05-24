import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Header from '../header/Header';
import ToastContainer from '../toasts/ToastContainer';

// adapted from:
// https://www.edwardbeazer.com/create-a-layout-component-using-react/

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>
        {children}
        {/* add footer when done... */}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Layout;
