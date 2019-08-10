import Request from '../../utils/request';
import { SIGN_UP_SUCCESS, HIDE_LOADER } from '../actionTypes';
import { setMessage, loader } from './settings';
import consts from '../../utils/const';

export function logIn(body, history)
{
  return dispatch => Request.post(`${consts.API_MAIN_URL}/auth/login`, JSON.stringify(body))
    .then((res) =>
    {
      const data = res.content;
      if (res.status === 200)
      {
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('expiryDate', expiryDate.toISOString());

        dispatch(loader(HIDE_LOADER));
        history.push('/Home');
      } else
      {
        throw new Error(res.message);
      }
    })
    .catch((e) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(e.message, 'error'));
    });
}

export function signUp(body)
{
  return dispatch => Request.post(`${consts.API_MAIN_URL}/auth/signup`, JSON.stringify(body))
    .then((res) =>
    {
      if (res.status === 201)
      {
        dispatch(loader(HIDE_LOADER));
        dispatch({ type: SIGN_UP_SUCCESS });
      } else
      {
        throw new Error(res.message);
      }
    })
    .catch((e) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(e.message, 'error'));
    });
}
