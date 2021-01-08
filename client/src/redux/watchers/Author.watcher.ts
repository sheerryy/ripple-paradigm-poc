import { takeLatest } from 'redux-saga/effects';

import {
  getAuthorsAsync,
  createAuthorAsync,
} from '../actions/Author.action';
import {
  createAuthorWorker,
  getAllAuthorWorker,
} from '../workers/Author.worker';

export function* getAllAuthorWatcher() {
  yield takeLatest(getAuthorsAsync, getAllAuthorWorker)
}

export function* createAuthorWatcher() {
  yield takeLatest(createAuthorAsync(), createAuthorWorker)
}