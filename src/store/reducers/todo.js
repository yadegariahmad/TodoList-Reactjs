
import
{
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  GET_TODOS,
  EDIT_TODO,
} from '../actionTypes';

export default function todoReducer(state = {}, action) 
{
  let retVal = {};

  switch (action.type)
  {
    case GET_TODOS:
      retVal.todos = action.payload !== 'error'
        ? [...action.payload.todos]
        : [];
      break;

    case ADD_TODO:
      action.payload !== 'error'
        ? retVal.addSuccess = true
        : retVal.error = true;
      break;

    case EDIT_TODO:
      action.payload !== 'error'
        ? retVal.editSuccess = true
        : retVal.error = true;
      break;

    case DELETE_TODO:
      retVal = action.payload !== 'error'
        ? {
          ...state,
          todos: [
            ...state.todos.filter(todo => todo._id !== action.payload),
          ],
        }
        : { ...state, editError: true };
      break;

    case TOGGLE_TODO:
      retVal = action.payload !== 'error'
        ? {
          ...state,
          todos: [
            ...state.todos.map(todo => (todo._id === action.payload
              ? { ...todo, completed: !todo.completed }
              : todo)),
          ],
        }
        : { ...state, toggleError: true };
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
