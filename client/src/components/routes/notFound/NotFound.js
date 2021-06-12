import React from 'react';
import FullHeightContainer from '../../layout/fullHeightContainer/FullHeightContainer';

const NotFound = ({ message = 'Page Not Found' }) => {
  return (
    <FullHeightContainer>
      <h1 className='text-light'>404 | {message}</h1>
    </FullHeightContainer>
  );
};

export default NotFound;
