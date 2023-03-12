import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import LogoutBtn from '../../Components/UI/Logout/Logout';
import SignInOrSignUp from '../../Components/UI/SignInAndSignUp/SignInAndSignUp';
import './Navigation.css';

const Navigation = () => {
  const { authData } = useSelector(store => store.auth);

  return (
    <Navbar className="navbar-container" bg="primary">
      <Nav className="mr-auto navbar-container__left-side">
        <Nav.Link className="navbar-container__link" href="#/">
          Home
        </Nav.Link>
        <Nav.Link className="navbar-container__link" href="#/contacts">
          Contacts
        </Nav.Link>
        {authData &&
          <Nav.Link className="navbar-container__link" href="#/albums">
            Albums
          </Nav.Link>}
      </Nav>
      <Nav className="navbar-container__right-side">
        {authData &&
          <Nav.Link className="navbar-container__link" href={'#/profile'}>
            Profile
          </Nav.Link>}
        {authData ? <LogoutBtn /> : <SignInOrSignUp />}
      </Nav>
    </Navbar>
  );
};

export default Navigation;
