import React from 'react';
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';

import Home from '../Components/Home/Home';
import Contacts from '../Components/Contacts/Contacts';
import SignUp from '../Components/auth/SignUp/SignUp';
import SignIn from '../Components/auth/SignIn/SignIn';
import Albums from '../Components/Form/Albums/Albums';
import Photos from '../Components/Form/Photos/Photos';
import UserProfile from '../Components/UserProfile/UserProfile';
import ForgotPassword from '../Components/ForgotPassword/ForgotPassword';
import PrivateRouteWithData from './PrivateRouteWithData';
import PrivateRouteWithoutData from './PrivateRouteWithoutData';

const CustomRoute = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/contacts' component={Contacts} />
      <Route path='/forgotPassword' component={ForgotPassword} />
      <PrivateRouteWithoutData path='/signUp'>
        <SignUp />
      </PrivateRouteWithoutData>
      <PrivateRouteWithoutData path='/signIn'>
        <SignIn />
      </PrivateRouteWithoutData>
      <PrivateRouteWithData exact path='/albums'>
        <Albums />
      </PrivateRouteWithData>
      <PrivateRouteWithData path='/albums/:id/photos'>
        <Photos />
      </PrivateRouteWithData>
      <PrivateRouteWithData path='/profile'>
        <UserProfile />
      </PrivateRouteWithData>
      <Redirect to='/' />
    </Switch>
  </HashRouter>
);

export default CustomRoute;
