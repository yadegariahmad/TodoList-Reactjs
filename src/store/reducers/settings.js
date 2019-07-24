import { SHOW_LOADER, HIDE_LOADER, SET_MESSAGE } from '../actionTypes';

const initialState = {
  showLoader: false,
  message: '',
  messageType: '',
};
export default function settingsReducer(state = initialState, action)
{
  let retVal = {};
  switch (action.type)
  {
    case SHOW_LOADER:
      retVal = {
        ...state,
        showLoader: true,
      };
      break;

    case HIDE_LOADER:
      retVal = {
        ...state,
        showLoader: false,
      };
      break;

    case SET_MESSAGE:
      retVal = {
        ...state,
        message: action.message,
        messageType: action.messageType,
      };
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
