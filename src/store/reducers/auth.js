import * as actionType from '../../constants/actionTypes';

const authReducer = (state = { user: null, authenticated: false }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('token', JSON.stringify(action?.user.token));

      return { ...state, user: action?.user.user, loading: false, authenticated: true, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, user: null, loading: false, authenticated: false, errors: null };
    default:
      return state;
  }
};

export default authReducer;
