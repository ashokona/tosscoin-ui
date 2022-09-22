import { AUTH, LOGOUT } from '../../constants/actionTypes';
import * as api from '../../services/api';
import * as paths from '../../constants/apiPaths';

//api call to signup and signin the user
export const authenticate = (path, data, navigate) => async (dispatch) => {
  try {
    const user = await api.post(path, data);
    dispatch({ type: AUTH, user });
    if(user.token) {
      sessionStorage.setItem('token', user.token)
    }
    navigate('/')
  } catch (error) {
    console.log(error);
  }
};

// api call to authorise the user using jwt token generated on backend
export const refreshToken = (navigate) => async (dispatch) => {
  try {
    const user = await api.get(paths.REFRESH_TOKEN);
    dispatch({ type: AUTH, user });
    if(user.token) {
      navigate('/')
    }
  } catch (error) {
    console.log(error)
  }
};

// export const logout = (router) => async (dispatch) => {
//   try {
//     // const user = await api.post(data);
//     dispatch({ type: LOGOUT });
//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };