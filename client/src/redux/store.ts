import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { AppState } from './types/App.type';

import { initialAuthorState } from './reducers/Author.reducer';
import { initialReportState } from './reducers/Report.reducer';

const init: AppState = {
  author: initialAuthorState,
  report: initialReportState
};

export function store(initialState: AppState = init) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  return {
    ...createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware))),
    runSaga: sagaMiddleware.run
  };
}