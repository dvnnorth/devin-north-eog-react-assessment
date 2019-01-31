import * as actions from '../actions';

const initialState = {
  selectedIndex: null
};

const updateSelectedLink = (state, action) => {
  if (Number.isNaN(action.index)) {
    return null;
  } else {
    return {
      selectedIndex: Math.floor(action.index)
    };
  }
};

const handlers = {
  [actions.UPDATE_SELECTED_LINK]: updateSelectedLink
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
