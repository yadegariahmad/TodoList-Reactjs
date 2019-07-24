import
{
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import settingsReducer from './reducers/settings';
import todoReducer from './reducers/todo';

// const Compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    user: userReducer,
    settings: settingsReducer,
    todo: todoReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);
