import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as settingsActions from './settings';
import * as types from '../actionTypes';

describe('settingsActions', () =>
{
  const createMockStore = configureMockStore([thunk]);
  const store = createMockStore({ settings: {} });

  beforeEach(() =>
  {
    store.clearActions();
  });

  describe('Loader', () =>
  {
    it('hides loader', () =>
    {
      const expectedActions = [{ type: types.HIDE_LOADER }];
      store.dispatch(settingsActions.loader(types.HIDE_LOADER));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it('shows loader', () =>
    {
      const expectedActions = [{ type: types.SHOW_LOADER }];
      store.dispatch(settingsActions.loader(types.SHOW_LOADER));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('Message', () =>
  {
    it('sets message', () =>
    {
      const expectedActions = [{ type: types.SET_MESSAGE, message: 'test', messageType: 'success' }];
      store.dispatch(settingsActions.setMessage('test', 'success'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
