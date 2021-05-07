import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user, isLoading } = useSelector((state) => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user && !isLoading) {
      console.log(user);
      console.log('not loading, is logged in');
      setIsAuthenticated(true);
    }
    if (!user && !isLoading) {
      console.log(user);
      console.log('not loading, not logged in');
      setIsAuthenticated(false);
    }
  }, [user, isLoading]);

  return (
    <Route
      {...props}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    ></Route>
  );
};

export default PrivateRoute;
