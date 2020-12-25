import { combineReducers } from 'redux';
import { authorReducer } from './Author.reducer';

export default combineReducers({
  author: authorReducer
});
