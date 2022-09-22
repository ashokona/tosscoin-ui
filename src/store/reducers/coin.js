import * as actionType from '../../constants/actionTypes';

const coinReducer = (state = { coin: null }, action) => {
  switch (action.type) {
    case actionType.COIN_DETAILS:
      return { ...state, coin: action?.data, loading: false, errors: null };
    case actionType.LAST_GUESS_DETAILS:
        return { ...state, guess: action?.user, loading: false, errors: null };
    default:
      return state;
  }
};

export default coinReducer;
