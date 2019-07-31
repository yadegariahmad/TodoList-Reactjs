import { SIGN_UP_SUCCESS } from '../actionTypes';

const initialState = {
  signedUp: false,
};

export default function userReducer(state = initialState, action)
{
  let retVal = {};
  switch (action.type)
  {
    case SIGN_UP_SUCCESS:
      retVal = { signedUp: true };
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
