import { useState } from 'react';

const UseInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const error = validateValue(enteredValue);

  const hasError = error !== null && isTouched;

  const inputBlurHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError,
    error,
    inputBlurHandler,
    reset,
  };
};

export default UseInput;
