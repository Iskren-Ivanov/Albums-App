import React, { Fragment, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Modal from './Modal/Modal';

import './UserProfile.css';

const UserProfile = () => {
  const [modal, setModal] = useState(false);

  const { authData } = useSelector((store) => store.auth);

  return (
    <Fragment>
      <Modal show={modal} handleClose={() => setModal(false)} />
      <Card className='user-profile-container'>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          <strong>Email:</strong> {authData?.email}
          <Button
            className='btn btn-primary w-100 mt-3 user-profil-btn'
            onClick={() => setModal(true)}
          >
            Change Password
          </Button>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default UserProfile;
