import Request from '../../utils/request';
import history from '../../utils/history';
import { SIGN_UP_SUCCESS, HIDE_LOADER } from '../actionTypes';
import { setMessage, loader } from './settings';

export function logIn(body)
{
  return dispatch => Request.post('http://localhost:8080/auth/login', JSON.stringify(body))
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
  return dispatch => Request.post('http://localhost:8080/auth/signup', JSON.stringify(body))
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
