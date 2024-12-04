import { baseURL } from "../Constants/Base_Url";
import axios from "axios";

import {
  USER_LOGIN_SUCCESSFUL,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQ,
  USER_LOGOUT,
  USER_SIGNUP_REQ,
  USER_SIGNUP_SUCCESSFUL,
  USER_SIGNUP_FAILED,
} from "../Constants/user";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQ });

    const config = { headers: { "Content-Type": "application/json" } };

    // Send login request to backend
    const { data } = await axios.post(
      `${baseURL}/api/user/login`,
      { email, password },
      config
    );

    // Save user details (excluding sensitive info like token) in localStorage
    dispatch({ type: USER_LOGIN_SUCCESSFUL, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const LogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const signupAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNUP_REQ });

    const config = { headers: { "Content-Type": "application/json" } };

    // Send signup request to backend
    const { data } = await axios.post(
      `${baseURL}/api/user/signup`,
      { name, email, password },
      config
    );

    // Save user details in localStorage
    dispatch({ type: USER_SIGNUP_SUCCESSFUL, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload: error.response?.data.message || error.message,
    });
  }
};
