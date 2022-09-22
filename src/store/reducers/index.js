import { combineReducers } from 'redux';

import auth from './auth';
import coin from './coin';

export const reducers = combineReducers({ auth, coin });
