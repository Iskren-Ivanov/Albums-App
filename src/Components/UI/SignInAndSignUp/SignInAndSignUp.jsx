import React, { Fragment } from 'react';
import { Nav } from 'react-bootstrap';
import '../UI.css';

const SignInOrSignUp = () => (
  <Fragment>
    <Nav.Link className='link' href='#/signIn'>
      Sign In
    </Nav.Link>
    <Nav.Link className='link' href='#/signUp'>
      Sign Up
    </Nav.Link>
  </Fragment>
);

export default SignInOrSignUp;
