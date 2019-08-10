const API_MAIN_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8080'
  : 'https://ahmad-todolist-api.herokuapp.com';

export default { API_MAIN_URL };
