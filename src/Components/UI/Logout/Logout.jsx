import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import authAction from '../../../store/actions/auth';
import '../UI.css';

const Logout = ({ logout }) => {
  const handleClick = () => {
    logout();
    localStorage.removeItem('userData');
  };

  return (
    <Fragment>
      <Nav.Link className="link" onClick={handleClick} href="#/">
        Logout
      </Nav.Link>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authAction.Logout())
});

export default connect(null, mapDispatchToProps)(Logout);
