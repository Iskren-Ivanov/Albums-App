import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import authRedux from '../../../store/actions/auth';
import validateInput from '../../../shared/validateInput/validateInput';
import useInput from '../../../hook/useInput';
import guid from '../../../shared/guid/guid';

import '../auth.css';

const SignUp = props => {
  let history = useHistory();

  useEffect(
    () => {
      if (props.successSignUp) {
        props.clearTheSuccessfullBooleans();
        history.push('/signIn');
      }
    },
    [props.successSignUp]
  );

  const {
    value: email,
    hasError: emailHasError,
    error: emailObjError,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => validateInput('email', value));

  const {
    value: password,
    hasError: passwordHasError,
    error: passwordObjError,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput
  } = useInput(value => validateInput('password', value));

  const {
    value: confirmPassword,
    hasError: confirmPasswordHasError,
    error: confirmPasswordObjError,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPasswordInput
  } = useInput(value => validateInput('confirmPassword', value, password));

  const handleSubmit = event => {
    event.preventDefault();
    props.signUp(email, password);
    resetEmailInput();
    resetPasswordInput();
    resetConfirmPasswordInput();
  };

  let classesEmail = emailHasError ? 'input-error' : '';
  let classesPassword = passwordHasError ? 'input-error' : '';
  let classesConfirmPassword = confirmPasswordHasError ? 'input-error' : '';

  const disabledBtn =
    emailHasError ||
    passwordHasError ||
    confirmPasswordHasError ||
    !email ||
    !password ||
    !confirmPassword;

  return (
    <div className="input-form sign-up">
      <Form key={guid()} noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            className={classesEmail}
            onBlur={emailBlurHandler}
            defaultValue={email}
            type="email"
            placeholder="Enter email"
          />
          {emailHasError &&
            <div className="error-text-input">
              {emailObjError.text}
            </div>}
          <Form.Text>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            className={classesPassword}
            onBlur={passwordBlurHandler}
            defaultValue={password}
            type="password"
            placeholder="Password"
          />
          {passwordHasError &&
            <div className="error-text-input">
              {passwordObjError.text}
            </div>}
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className={classesConfirmPassword}
            onBlur={confirmPasswordBlurHandler}
            defaultValue={confirmPassword}
            type="password"
            placeholder="Confirm Password"
          />
          {confirmPasswordHasError &&
            <div className="error-text-input">
              {confirmPasswordObjError.text}
            </div>}
        </Form.Group>
        <Button disabled={disabledBtn} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/signIn">Sign in</Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { successSignUp } = state.auth;
  return { successSignUp };
};

const mapDispatchToProps = dispatch => ({
  signUp: async (email, password) =>
    await dispatch(authRedux.SingUp(email, password)),
  clearTheSuccessfullBooleans: () =>
    dispatch(authRedux.ClearTheSuccessfullBooleans())
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
