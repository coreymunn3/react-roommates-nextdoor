import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routes/privateRoute/PrivateRoute';
import Login from './components/routes/login/Login';
import Signup from './components/routes/signup/Signup';
import Feed from './components/routes/feed/Feed';
import NewPost from './components/routes/newPost/NewPost';
import PageLayout from './components/layout/PageLayout';
import Listing from './components/routes/listing/Listing';
import MyProfile from './components/routes/myProfile/MyProfile';
import MyPosts from './components/routes/myPosts/MyPosts';
import NotFound from './components/routes/notFound/NotFound';
// global sass - contains theming
import './App.global.scss';
// redux
import { useDispatch } from 'react-redux';
import { getUser, setUserFromLS } from './redux/userSlice';
import { getAllLocations } from './redux/locationSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // set user state
    if (localStorage.getItem('userState')) {
      const payload = JSON.parse(localStorage.getItem('userState'));
      dispatch(setUserFromLS(payload));
    } else {
      dispatch(getUser());
    }
    // get locations
    dispatch(getAllLocations());
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <PageLayout>
          <PrivateRoute exact path='/feed' component={Feed} />
          <PrivateRoute path='/feed/:id' component={Listing} />
          <PrivateRoute exact path='/new-post' component={NewPost} />
          <PrivateRoute exact path='/myprofile' component={MyProfile} />
          <PrivateRoute exact path='/myposts' component={MyPosts} />
          <Route component={NotFound} />
        </PageLayout>
      </Switch>
    </Router>
  );
};

export default App;
