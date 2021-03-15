import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/pages/login/Login';
import Signup from './components/pages/signup/Signup';
import Feed from './components/pages/feed/Feed';
// global sass - contains theming
import './App.global.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Feed} />
      </Switch>
    </Router>
  );
};

export default App;
