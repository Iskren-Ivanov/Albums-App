import React from 'react';
import { Route, Redirect } from 'react-router';

const PrivateRouteWithoutData = ({ children, ...rest }) => (
  <Route
    {...rest}
    render={({ location }) =>
      localStorage.getItem('userData') ? <Redirect to='/' /> : children
    }
  />
);

export default PrivateRouteWithoutData;
