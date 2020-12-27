import { combineReducers } from 'redux';

import { authorReducer } from './Author.reducer';
import { reportReducer } from './Report.reducer';

export default combineReducers({
  author: authorReducer,
  report: reportReducer,
});
