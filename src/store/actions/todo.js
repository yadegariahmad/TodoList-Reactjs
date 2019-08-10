import Request from '../../utils/request';
import
{
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  GET_TODOS,
  EDIT_TODO,
  HIDE_LOADER,
} from '../actionTypes';
import { setMessage, loader } from './settings';
import consts from '../../utils/const';

export function getTodos()
{
  const userId = localStorage.getItem('userId');
  return dispatch => Request.get(`${consts.API_MAIN_URL}/todo/getTodos?userId=${userId}`)
    .then((res) =>
    {
      if (res.status === 200)
      {
        dispatch({
          type: GET_TODOS,
          payload: res.content.todos,
        });

        dispatch(loader(HIDE_LOADER));
      } else
      {
        throw Error(res.message);
      }
    })
    .catch((err) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(err.message, 'error'));
    });
}

export function addTodo(todo, history)
{
  return dispatch => Request.post(`${consts.API_MAIN_URL}/todo/addTodo`, JSON.stringify(todo))
    .then((res) =>
    {
      if (res.status === 201)
      {
        dispatch({
          type: ADD_TODO,
          payload: { ...todo, _id: res.content.todoID },
        });

        dispatch(loader(HIDE_LOADER));
        history.push('/Home');
      } else
      {
        throw Error(res.message);
      }
    })
    .catch((err) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(err.message, 'error'));
    });
}

export function editTodo(data, history)
{
  return dispatch => Request.put(`${consts.API_MAIN_URL}/todo/updateTodo`, JSON.stringify(data))
    .then((res) =>
    {
      if (res.status === 200)
      {
        dispatch({
          type: EDIT_TODO,
          payload: data,
        });

        dispatch(loader(HIDE_LOADER));
        history.push('/Home');
      } else
      {
        throw Error(res.message);
      }
    })
    .catch((err) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(err.message, 'error'));
    });
}

export function deleteTodo(id)
{
  const userId = localStorage.getItem('userId');
  return dispatch => Request.delete(`${consts.API_MAIN_URL}/todo/deleteTodo/${id}?userId=${userId}`)
    .then((res) =>
    {
      if (res.status === 200)
      {
        dispatch({
          type: DELETE_TODO,
          payload: id,
        });

        dispatch(loader(HIDE_LOADER));
      } else
      {
        throw Error(res.message);
      }
    })
    .catch((err) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(err.message, 'error'));
    });
}

export function toggleTodo(id)
{
  const userId = localStorage.getItem('userId');
  return dispatch => Request.put(`${consts.API_MAIN_URL}/todo/toggleTodo/${id}?userId=${userId}`, {})
    .then((res) =>
    {
      if (res.status === 200)
      {
        dispatch({
          type: TOGGLE_TODO,
          payload: id,
        });

        dispatch(loader(HIDE_LOADER));
      } else
      {
        throw Error(res.message);
      }
    })
    .catch((err) =>
    {
      dispatch(loader(HIDE_LOADER));
      dispatch(setMessage(err.message, 'error'));
    });
}
