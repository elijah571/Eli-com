import { baseURL } from "../Constants/Base_Url";
import axios from "axios"; // Removed curly braces from axios import

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
    const { data } = await axios.post(
      `${baseURL}/api/user/login`,
      { email, password },
      config
    );
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
    const { data } = await axios.post(
      `${baseURL}/api/user/signup`,
      { name, email, password },
      config
    );
    dispatch({ type: USER_SIGNUP_SUCCESSFUL, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAILED,
      payload: error.response?.data.message || error.message,
    });
  }
};
