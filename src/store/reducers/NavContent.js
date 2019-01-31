import * as actions from '../actions';

const initialState = {
  selectedIndex: null,
  drawerOpen: true
};

const updateSelectedLink = (state, action) => {
  if (Number.isNaN(action.index)) {
    return null;
  } else {
    return {
      ...state,
      selectedIndex: Math.floor(action.index)
    };
  }
};

const toggleDrawer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_DRAWER:
      return {
        ...state,
        drawerOpen: true
      };
    case actions.CLOSE_DRAWER:
      return {
        ...state,
        drawerOpen: false
      };
    default:
      return {
        ...state,
        drawerOpen: false
      };
  }
};

const handlers = {
  [actions.UPDATE_SELECTED_LINK]: updateSelectedLink,
  [actions.OPEN_DRAWER]: toggleDrawer,
  [actions.CLOSE_DRAWER]: toggleDrawer
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
