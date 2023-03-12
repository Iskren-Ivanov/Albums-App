import React from 'react';
import './Contacts.css';

const ContactsForm = () => (
  <div className='contacts'>
    <div className='primary'>
      <h1 className='display-10'>Contact Us:</h1>
      <hr className='my-4' />
      <h4 className='display-10'>Work time: 9:00AM - 7:30PM (Monday-Friday)</h4>
      <hr className='my-4' />
      <h4 className='display-10'>
        Address: Sofia, Bulgaria street "Vitosha" 1
      </h4>
      <hr className='my-4' />
      <h4 className='display-10'>Phone: +359 123 456 789</h4>
      <hr className='my-4' />
      <h3 className='display-10'>Email: localHost@localhost.com</h3>
    </div>
  </div>
);

export default ContactsForm;
