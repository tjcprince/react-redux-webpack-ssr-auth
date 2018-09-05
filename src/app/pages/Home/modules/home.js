import fetch from 'isomorphic-fetch';
import { RSAA } from 'redux-api-middleware';
import createReducer from '../../../store/reducerUtils';

export const key = 'home';

export const HOME_INCREMENT = `${key}/HOME_INCREMENT`;
export const HOME_DOUBLE_ASYNC = `${key}/HOME_DOUBLE_ASYNC`;
export const GET_USERS = `${key}/GET_USERS`;

export const ADD_USER = `${key}/ADD_USER`;
export const ADD_USER_SUCCESS = `${key}/ADD_USER_SUCCESS`;
export const FAILURE = `${key}/FAILURE`;

export const increment = (value = 1) => ({
  type: HOME_INCREMENT,
  payload: value
});
export const getUsers = users => ({
  type: GET_USERS,
  users
});
export const doubleAsync = () => dispatch =>
  new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: HOME_DOUBLE_ASYNC,
        payload: null
      });
      resolve();
    }, 200);
  });

export const fetchGetUsers = () => dispatch =>
  fetch('http://rap2api.taobao.org/app/mock/22711/users', { credentials: 'include' })
    .then(res => res.json())
    .then((data) => {
      dispatch(getUsers(data.data));
    })
    .catch((e) => {
      console.log(e.message);
    });

export const addUsers = () => ({
  [RSAA]: {
    endpoint: 'http://rap2api.taobao.org/app/mock/22711/add',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: {
      userName: '哈哈'
    },
    types: [
      {
        type: ADD_USER,
        payload: action => ({ endpoint: action }),
        meta: { source: 'user' }
      },
      ADD_USER_SUCCESS,
      FAILURE
    ]
  }
});

export const actions = {
  increment,
  doubleAsync,
  fetchGetUsers,
  addUsers
};

const ACTION_HANLDERS = {
  [HOME_INCREMENT]: (state, action) => ({
    ...state,
    count: state.count + action.payload
  }),
  [HOME_DOUBLE_ASYNC]: state => ({
    ...state,
    count: state.count * 2
  }),
  [GET_USERS]: (state, action) => ({
    ...state,
    users: action.users
  }),
  [ADD_USER]: (state, action) => {
    console.log(action);
    return {
      ...state
    };
  },
  [ADD_USER_SUCCESS]: (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.payload.user
    };
  },
  [FAILURE]: (state, action) => {
    console.log(action);
    return {
      ...state
    };
  }
};

const initalState = {
  count: 0,
  users: [],
  user: {
    userName: '初始值'
  }
};

export default createReducer(initalState, ACTION_HANLDERS);
