import { NotificationManager } from 'react-notifications';
import { auth } from '../../firebase/firebase';

const SingUp = (email, password) => {
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        NotificationManager.success('Successful Sign Up!', 'Sign Up', 5000);
        dispatch({ type: 'SIGN_UP_SUCCESS', message: 'Successful Sign Up!' });
      })
      .catch(error => {
        NotificationManager.warning(error.message, 'Error', 5000);
        dispatch({ type: 'SIGN_UP_ERROR', message: error.message });
      });
  };
};

const SingIn = (email, password) => {
  return dispatch => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const authData = {
          email: response.user.email,
          authToken: response.user.l
        };
        NotificationManager.success('Successful Sign In!', 'Sign In', 5000);
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          authData: authData,
          message: 'Successful Sign In!'
        });
        localStorage.setItem('userData', JSON.stringify(authData));
      })
      .catch(error => {
        NotificationManager.warning(error.message, 'Error', 5000);
        dispatch({ type: 'SIGN_IN_ERROR', message: error.message });
      });
  };
};

const Logout = () => {
  return dispatch => {
    auth.signOut();
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };
};
const GetLocalStoreDataForStart = localStoreData => {
  return dispatch => {
    dispatch({
      type: 'GET_LOCALE_STORE_DATA_FOR_START',
      authData: localStoreData
    });
  };
};

const ChangePassword = newPassoword => {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(newPassoword).then(
          () => {
            NotificationManager.success(
              'You Have Successfully Changed Your Password!',
              'Change Password',
              5000
            );
          },
          error => {
            NotificationManager.warning(error.message, 'Error', 5000);
          }
        );
        dispatch({ type: 'CHANGE_PASSWORD' });
      }
    });
  };
};

const ClearTheSuccessfullBooleans = () => {
  return dispatch => {
    dispatch({ type: 'CLEAR_THE_SUCCESSFUL_BOOLEANS' });
  };
};

export default {
  SingUp,
  SingIn,
  GetLocalStoreDataForStart,
  Logout,
  ChangePassword,
  ClearTheSuccessfullBooleans
};
