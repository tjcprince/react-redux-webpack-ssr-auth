import { combineReducers } from 'redux';

import rootReducer, { key as rootkey } from '../pages/rootReducer';
import homeReducer, { key as homeKey } from '../pages/Home/modules/home';
import loginReducer, { key as loginKey } from '../pages/Login/modules/login';

export default combineReducers({
  [rootkey]: rootReducer,
  [homeKey]: homeReducer,
  [loginKey]: loginReducer
});
