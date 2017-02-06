import { START_CHANGE_COLOR, RECEIVE_NEW_COLOR } from './actions';

const reducer = (state = {color:'pink'}, action) => {
  switch (action.type) {
  case START_CHANGE_COLOR:
    return Object.assign({}, state, {isUpdating: true});
  case RECEIVE_NEW_COLOR:
    return Object.assign({}, state, {color: action.payload.color, isUpdating: false});
  default:
    return state;
  }
};

export default reducer;

