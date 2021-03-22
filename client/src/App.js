import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/routes/login/Login';
import Signup from './components/routes/signup/Signup';
import Feed from './components/routes/feed/Feed';
// global sass - contains theming
import './App.global.scss';
// redux
import { useDispatch } from 'react-redux';
import { getUser } from './redux/userSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/feed' component={Feed} />
      </Switch>
    </Router>
  );
};

export default App;
