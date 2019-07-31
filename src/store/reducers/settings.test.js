import settingsReducer from './settings';
import * as types from '../actionTypes';

describe('settingsReducer', () =>
{
  const initial = { showLoader: false, message: '', messageType: '' };

  it('returns initial state by default', () =>
  {
    expect(settingsReducer(initial, {})).toEqual(initial);
  });

  describe('Loader', () =>
  {
    it('sets showLoader to true', () =>
    {
      const state = { ...initial, showLoader: true };
      expect(settingsReducer(initial, { type: types.SHOW_LOADER })).toEqual(state);
    });

    it('sets showLoader to false', () =>
    {
      const state = { ...initial, showLoader: false };
      expect(settingsReducer(initial, { type: types.HIDE_LOADER })).toEqual(state);
    });
  });

  describe('Message', () =>
  {
    it('sets message text and message type', () =>
    {
      const state = { ...initial, message: 'Test', messageType: 'error' };
      const action = { type: types.SET_MESSAGE, message: 'Test', messageType: 'error' };
      expect(settingsReducer(initial, action)).toEqual(state);
    });
  });
});
