import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';

import authRedux from '../../../store/actions/auth';
import validateInput from '../../../shared/validateInput/validateInput';
import useInput from '../../../hook/useInput';

import './Modal.css';

const MyModal = ({ show, handleClose, changePassoword }) => {  
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(show);
  }, [show]);
  
  const {
    value: password,
    hasError: passwordHasError,
    error: passwordObjError,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => validateInput('password', value));

  const {
    value: confirmPassword,
    hasError: confirmPasswordHasError,
    error: confirmPasswordObjError,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => validateInput('confirmPassword', value, password));

  const handleSubmit = (event) => {
    event.preventDefault();
    changePassoword(password);
    setVisible(false);
  };

  let classesPassword = passwordHasError ? 'input-error' : '';
  let classesConfirmPassword = confirmPasswordHasError ? 'input-error' : '';

  const disabledBtn =
    passwordHasError ||
    confirmPasswordHasError ||
    !password ||
    !confirmPassword;

  return (
    <div>
      <Modal show={visible} onHide={handleClose}>
        <div className='modal-container'>
          <Modal.Header>
            <Modal.Title>Change Password</Modal.Title>
          </Modal.Header>
          <Form onSubmit={(е) => handleSubmit(е)}>
            <Form.Group>
              <Form.Label>
                <b>New Password</b>
              </Form.Label>
              <Form.Control
                className={classesPassword}
                onBlur={passwordBlurHandler}
                defaultValue={password}
                type='password'
                placeholder='Enter new password'
              />
              {passwordHasError && (
                <p className='error-text-input'>{passwordObjError.text}</p>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Confirm Password</b>
              </Form.Label>
              <Form.Control
                className={classesConfirmPassword}
                onBlur={confirmPasswordBlurHandler}
                defaultValue={confirmPassword}
                type='password'
                placeholder='Confirm Password'
              />
              {confirmPasswordHasError && (
                <p className='error-text-input'>
                  {confirmPasswordObjError.text}
                </p>
              )}
            </Form.Group>

            <div className='modal-container__btns-wrapper'>
              <Button disabled={disabledBtn} variant='primary' type='submit'>
                Update
              </Button>
              <Button variant='secondary' onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  changePassoword: (newPassword) =>
    dispatch(authRedux.ChangePassword(newPassword)),
});

export default connect(null, mapDispatchToProps)(MyModal);
