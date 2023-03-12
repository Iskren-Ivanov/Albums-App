import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import authRedux from '../../../store/actions/auth';
import validateInput from '../../../shared/validateInput/validateInput';
import useInput from '../../../hook/useInput';
import guid from '../../../shared/guid/guid';

import '../auth.css';

const SignIn = (props) => {
  useEffect(() => {
    if (props.successSignIn) {
      history.push('/');
      props.clearTheSuccessfullBooleans();
    }
  }, [props.successSignIn]);

  const {
    value: email,
    hasError: emailHasError,
    error: emailObjError,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validateInput('email', value));

  const {
    value: password,
    hasError: passwordHasError,
    error: passwordObjError,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => validateInput('password', value));

  const history = useHistory();

  const classesEmail = emailHasError ? 'input-error' : '';
  const classesPassword = passwordHasError ? 'input-error' : '';

  const disabledBtn = emailHasError || passwordHasError || !email || !password;

  const handlerSubmit = (event) => {
    event.preventDefault();
    props.signIn(email, password);
    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <div className='input-form sign-in'>
      <Form key={guid()} onSubmit={(е) => handlerSubmit(е)}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className={classesEmail}
            onBlur={emailBlurHandler}
            defaultValue={email}
            type='email'
            placeholder='Enter email'
          />
          {emailHasError && (
            <div className='error-text-input'>{emailObjError.text}</div>
          )}
          <Form.Text>We"ll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={classesPassword}
            onBlur={passwordBlurHandler}
            defaultValue={password}
            type='password'
            placeholder='Password'
          />
          {passwordHasError && (
            <div className='error-text-input'>{passwordObjError.text}</div>
          )}
        </Form.Group>
        <Button disabled={disabledBtn} variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <div className='w-100 text-center mt-2'>
        <Link to='/forgotPassword'> Forgot Password? </Link>
      </div>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signUp'> Sign up</Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { successSignIn } = state.auth;
  return { successSignIn };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: async (email, password) =>
    await dispatch(authRedux.SingIn(email, password)),
  clearTheSuccessfullBooleans: () =>
    dispatch(authRedux.ClearTheSuccessfullBooleans()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
