import { RSAA } from 'redux-api-middleware';
import { getToken } from '../utils/authToken';

const authMiddleware = ({ getState, dispatch }) => next => (action) => {
  // Add header
  if (action[RSAA]) {
    action[RSAA].credentials = 'include';
    action[RSAA].headers = {
      Authorization: `${getToken()}`,
      ...action[RSAA].headers
    };

    if (action[RSAA].method !== 'GET') {
      action[RSAA].body = JSON.stringify(action[RSAA].body);
    }
  }

  return next(action);
};

export default authMiddleware;
