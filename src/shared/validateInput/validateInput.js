import { useRef } from 'react';

import * as EmailValidator from 'email-validator';

const ValidatedInputs = (type, enteredValue, confirmPassword) => {
  let err = null;
  const value = enteredValue.trim();
  if (!value && (type === 'email' || type === 'password')) {
    const valueWithFirstCapitalLetter =
      type.charAt(0).toUpperCase() + type.slice(1); 
    return {
      type,
      text: `${valueWithFirstCapitalLetter} is required!`
    };
  }
  
  switch (type) {
    case 'email':
      if (!EmailValidator.validate(value)) {
        err = { type: 'email', text: 'Invalid email address!' };
      }
      break;
    case 'password':
      const passwordRegex = /(?=.*[0-9])/;
      if (value.length < 8) {
        err = { type: 'password', text: 'Password must be 8 characters long!' };
      } else if (!passwordRegex.test(value)) {
        err = {
          type: 'password',
          text: 'Invalid password. Must contain one number!'
        };
      }
      break;
    case 'confirmPassword':
      const password = value;
      if (confirmPassword !== password) {
        err = {
          type: 'password and confirm password',
          text: 'Passwords are not the same!'
        };
      }
      break;
  }
  return err;
};

export default ValidatedInputs;
