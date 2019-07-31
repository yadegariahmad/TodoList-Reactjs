import userReducer from './user';
import * as types from '../actionTypes';

describe('userReducer', () =>
{
  it('sets signedUp to true', () =>
  {
    const retVal = { signedUp: true };
    expect(userReducer(undefined, { type: types.SIGN_UP_SUCCESS }))
      .toEqual(retVal);
  });
});
