import React, { useEffect, useState } from 'react';
import PageLayout from '../../layout/PageLayout';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user, isLoading } = useSelector((state) => state.user);

  return (
    <Route
      {...props}
      render={(props) =>
        !user?.loggedIn && !isLoading ? (
          <Redirect to='/login' />
        ) : (
          <PageLayout>
            <Component {...props} />
          </PageLayout>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
