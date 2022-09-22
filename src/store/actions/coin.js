import { COIN_DETAILS, LAST_GUESS_DETAILS, AUTH } from '../../constants/actionTypes';
import * as api from '../../services/api';

// api to fetch latest details so that user could take a guess
export const fetchCoinDetails = () => async (dispatch) => {
  try {
    const { data } = await api.get('coin/details');
    dispatch({ type: COIN_DETAILS, data });
  } catch (error) {
    console.log(error);
  }
};

//fetches last guess based on which score and option to diable guessing would be done
export const fetchLastGuess = () => async (dispatch) => {
  try {
    const { user } = await api.get('coin/guess');
    dispatch({ type: LAST_GUESS_DETAILS, user });
  } catch (error) {
    console.log(error);
  }
};

//Api call to update last guess made by user
export const updateGuess = (body) => async (dispatch) => {
  try {
    const { user } = await api.post('coin/create', body);
    dispatch({ type: LAST_GUESS_DETAILS, user });
  } catch (error) {
    console.log(error);
  }
};
