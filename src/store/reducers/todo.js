
import
{
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  GET_TODOS,
  EDIT_TODO,
} from '../actionTypes';

export default function todoReducer(state = [], action)
{
  let retVal = [];

  switch (action.type)
  {
    case GET_TODOS:
      retVal = [...action.payload];
      break;

    case ADD_TODO:
      retVal = [...state, action.payload];
      break;

    case EDIT_TODO:
      retVal = state.map(todo => (
        todo._id === action.payload.todoId
          ? { ...todo, content: action.payload.content }
          : { ...todo }
      ));
      break;

    case DELETE_TODO:
      retVal = state.filter(todo => todo._id !== action.payload);
      break;

    case TOGGLE_TODO:
      retVal = state.map(todo => (
        todo._id === action.payload
          ? { ...todo, completed: !todo.completed }
          : { ...todo }
      ));
      break;

    default:
      retVal = state;
      break;
  }

  return retVal;
}
