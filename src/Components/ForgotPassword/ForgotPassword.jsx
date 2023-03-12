import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { auth } from '../../firebase/firebase';

import { NotificationManager } from 'react-notifications';

import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await auth.sendPasswordResetEmail(email);
      NotificationManager.success(
        'Check your inbox for further instructions',
        'Forgot Password Success',
        7000
      );
    } catch (error) {
      NotificationManager.warning(error.message, 'Forgot Password Error', 7000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card>
        <Card.Body className='forgot-password-container'>
          <h2 className='text-center mb-4'>Password Reset</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='email-text-form' id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                onBlur={(event) => setEmail(event.target.value)}
                defaultValue={email}
                required
              />
            </Form.Group>
            <Button disabled={loading} className='w-100' type='submit'>
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ForgotPassword;
