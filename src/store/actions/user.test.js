import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as userActions from './user';
import * as types from '../actionTypes';

describe('userActions', () =>
{
  const createMockStore = configureMockStore([thunk]);
  const store = createMockStore({ settings: {}, user: {} });
  const mock = new MockAdapter(axios);

  beforeEach(() =>
  {
    store.clearActions();
  });

  describe('Login', () =>
  {
    it('login successfuly and sets token and userId and expiryDate on localStorage', () =>
    {
      const expectedActions = [{ type: types.HIDE_LOADER }];
      const data = { status: 200, content: { userId: '', token: '' } };
      mock.onPost('http://localhost:8080/auth/login').reply(200, data);

      return store.dispatch(userActions.logIn(null, [])).then(() =>
      {
        expect(localStorage.setItem).toHaveBeenCalledWith('token', '');
        expect(localStorage.setItem).toHaveBeenCalledWith('userId', '');

        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('login unSuccessfuly then hides loader and sets error message', () =>
    {
      const expectedActions = [
        { type: types.HIDE_LOADER },
        { type: types.SET_MESSAGE, message: 'ERROR', messageType: 'error' },
      ];
      const data = { status: 0, content: {}, message: 'ERROR' };
      mock.onPost('http://localhost:8080/auth/login').reply(210, data);

      return store.dispatch(userActions.logIn(null, [])).then(() =>
      {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('SignUp', () =>
  {
    it('signUp successfuly then hides loader and sends signUp success message', () =>
    {
      const expectedActions = [{ type: types.HIDE_LOADER }, { type: types.SIGN_UP_SUCCESS }];
      const data = { status: 201, content: {} };
      mock.onPost('http://localhost:8080/auth/signup').reply(200, data);

      return store.dispatch(userActions.signUp(null)).then(() =>
      {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('signUp unSuccessfuly then hides loader and sets error message', () =>
    {
      const expectedActions = [
        { type: types.HIDE_LOADER },
        { type: types.SET_MESSAGE, message: 'ERROR', messageType: 'error' },
      ];
      const data = { status: 0, content: {}, message: 'ERROR' };
      mock.onPost('http://localhost:8080/auth/signup').reply(210, data);

      return store.dispatch(userActions.signUp(null)).then(() =>
      {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
