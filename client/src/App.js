import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login-component/index';
import Signup from './signup-component/index';
import Feed from './feed-component/index';
// global sass - contains theming
import './App.global.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Feed} />
      </Switch>
    </Router>
  );
};

export default App;
