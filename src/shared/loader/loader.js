import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import './loader.css';

const loader = () => (
  <Button variant='primary' disabled>
    <Spinner
      as='span'
      animation='grow'
      size='lg'
      role='status'
      aria-hidden='true'
    />
    Loading...
  </Button>
);

export default loader;
