import React from 'react';
import Header from '../header/Header';

// adapted from:
// https://www.edwardbeazer.com/create-a-layout-component-using-react/

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* add footer when done... */}
    </div>
  );
};

export default Layout;
