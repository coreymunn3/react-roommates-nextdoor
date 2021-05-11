import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user, isLoading } = useSelector((state) => state.user);

  return (
    <Route
      {...props}
      render={(props) =>
        user?.loggedIn && !isLoading ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
