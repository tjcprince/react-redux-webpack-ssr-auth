import { RSAA } from 'redux-api-middleware';
import { setToken } from '../../../utils/authToken';
import appConfig from '../../../config/default';
import createReducer from '../../../store/reducerUtils';

export const key = 'session';

export const CHANGE_AUTHED = `${key}/CHANGE_AUTHED`;

export const LOGIN = `${key}/LOGIN`;
export const LOGIN_SUCCESS = `${key}/LOGIN_SUCCESS`;
export const FAILURE = `${key}/FAILURE`;

export const GET_USER = `${key}/GET_USER`;
export const GET_USER_SUCCESS = `${key}/GET_USER_SUCCESS`;

export const changeAuthed = authed => ({
  type: CHANGE_AUTHED,
  authed
});

export const login = () => ({
  [RSAA]: {
    endpoint: `${appConfig.api}/login`,
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: {
      username: 'admin',
      password: '111111'
    },
    types: [
      {
        type: LOGIN,
        payload: action => ({ endpoint: action })
      },
      LOGIN_SUCCESS,
      FAILURE
    ]
  }
});

export const getUser = () => ({
  [RSAA]: {
    endpoint: `${appConfig.api}/getUser`,
    method: 'GET',
    types: [
      {
        type: GET_USER,
        payload: action => ({ endpoint: action })
      },
      GET_USER_SUCCESS,
      FAILURE
    ]
  }
});
export const actions = {
  changeAuthed,
  login
};

const ACTION_HANLDERS = {
  [CHANGE_AUTHED]: (state, action) => ({
    ...state,
    authed: action.authed
  }),
  [LOGIN]: state => ({
    ...state
  }),
  [LOGIN_SUCCESS]: (state, action) => {
    setToken(action.payload.token);
    return {
      ...state,
      authed: true
    };
  },
  [FAILURE]: (state) => {
    console.log('请求失败');
    return {
      ...state
    };
  },
  [GET_USER]: state => ({
    ...state
  }),
  [GET_USER_SUCCESS]: (state, action) => {
    console.log(action);
    if (action.payload.success) {
      return {
        ...state,
        user: action.payload.user,
        authed: true
      };
    }
    return {
      ...state,
      user: {},
      authed: false
    };
  }
};

const initalState = {
  authed: false,
  user: {}
};

export default createReducer(initalState, ACTION_HANLDERS);
