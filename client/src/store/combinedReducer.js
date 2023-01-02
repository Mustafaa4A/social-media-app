import { combineReducers } from 'redux';
import post from './post/postReducer';
import auth from './auth/authReducer';
const reducer = combineReducers({
  post,
  auth,
 })

export default reducer;