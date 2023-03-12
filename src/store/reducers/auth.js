const initState = {
  message: null,
  authData: null,
  successSignUp: false,
  successSignIn: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGN_UP_ERROR':
      return {
        ...state,
        message: action.message,
      };
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        message: action.message,
        successSignUp: true,
      };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        authData: null,
        message: action.message,
      };
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        authData: action.authData,
        message: action.message,
        successSignIn: true,
      };
    case 'LOGOUT':
      return {
        authData: null,
      };
    case 'GET_LOCALE_STORE_DATA_FOR_START':
      return {
        ...state,
        authData: action.authData,
      };
    case 'CHANGE_PASSWORD':
      return {
        ...state,
      };
    case 'CLEAR_THE_SUCCESSFUL_BOOLEANS':
      return {
        ...state,
        successSignUp: false,
        successSignIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
