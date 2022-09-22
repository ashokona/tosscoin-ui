import { COIN_DETAILS, LAST_GUESS_DETAILS, AUTH } from '../../constants/actionTypes';
import * as api from '../../services/api';
import * as paths from '../../constants/apiPaths';

export const fetchCoinDetails = () => async (dispatch) => {
  try {
    const { data } = await api.get('coin/details');
    dispatch({ type: COIN_DETAILS, data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLastGuess = (params) => async (dispatch) => {
  try {
    const { user } = await api.get('coin/guess');
    dispatch({ type: LAST_GUESS_DETAILS, user });
  } catch (error) {
    console.log(error);
  }
};

export const updateGuess = (body) => async (dispatch) => {
  try {
    const { user } = await api.post('coin/create', body);
    dispatch({ type: LAST_GUESS_DETAILS, user });
  } catch (error) {
    console.log(error);
  }
};
