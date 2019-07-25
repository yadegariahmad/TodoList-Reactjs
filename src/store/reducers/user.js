import { SIGN_UP_SUCCESS, GET_USER_ID } from '../actionTypes';

const initialState = {
  signedUp: false,
};

export default function userReducer(state = initialState, action)
{
  let retVal = {};
  switch (action.type)
  {
    case SIGN_UP_SUCCESS:
      retVal = { ...state, signedUp: true };
      break;

    case GET_USER_ID:
      retVal = { userId: state.userId };
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
