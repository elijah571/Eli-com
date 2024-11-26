import {
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQ,
  USER_LOGOUT,
  USER_SIGNUP_REQ,
  USER_SIGNUP_SUCCESSFUL,
  USER_SIGNUP_FAILED,
} from "../Constants/user";

const authReducer = (
  state = { loading: false, userInfo: null, error: null },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQ:
    case USER_SIGNUP_REQ:
      return { loading: true, userInfo: null, error: null };

    case USER_LOGIN_SUCCESSFUL:
    case USER_SIGNUP_SUCCESSFUL:
      return { loading: false, userInfo: action.payload, error: null };

    case USER_LOGIN_FAILED:
    case USER_SIGNUP_FAILED:
      return { loading: false, userInfo: null, error: action.payload };

    case USER_LOGOUT:
      return { loading: false, userInfo: null, error: null };

    default:
      return state;
  }
};
export default authReducer;
