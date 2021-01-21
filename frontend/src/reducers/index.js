import { combineReducers } from 'redux';
import errors from './errors';
import messages from './messages';
import auth from './auth';
import vendor from './vendor';

export default combineReducers({
  errors,
  messages,
  auth,
  vendor,
});