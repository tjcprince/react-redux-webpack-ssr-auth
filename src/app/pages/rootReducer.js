import createReducer from '../store/reducerUtils';

export const key = 'root';

export const ROOT_AUTH = `${key}/ROOT_AUTH`;
export const ROOT_CHANGE_SELECTED_KEYS = `${key}/ROOT_SELECTED_KEY`;
export const ROOT_CHANGE_COLLAPSED = `${key}/ROOT_CHANGE_COLLAPSED`;

export const auth = () => dispatch =>
  new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: ROOT_AUTH,
        payload: true
      });
      resolve();
    }, 300);
  });

export const changeSelectedKeys = itemKey => ({
  type: ROOT_CHANGE_SELECTED_KEYS,
  payload: itemKey
});

export const changeCollapsed = collapsed => ({
  type: ROOT_CHANGE_COLLAPSED,
  payload: collapsed
});

export const actions = {
  auth,
  changeSelectedKeys,
  changeCollapsed
};

const ACTION_HANLDERS = {
  [ROOT_AUTH]: (state, action) => ({
    ...state,
    auth: action.payload
  }),
  [ROOT_CHANGE_SELECTED_KEYS]: (state, action) => ({
    ...state,
    selectedKeys: [action.payload]
  }),
  [ROOT_CHANGE_COLLAPSED]: (state, action) => ({
    ...state,
    collapsed: action.payload
  })
};

const initalState = {
  auth: false,
  collapsed: false,
  selectedKeys: []
};

export default createReducer(initalState, ACTION_HANLDERS);
