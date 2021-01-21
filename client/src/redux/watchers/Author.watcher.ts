import { takeLatest } from 'redux-saga/effects';

import { getAuthorsAsync } from '../actions/Author.action';
import { getAllAuthorWorker } from '../workers/Author.worker';

export function* getAllAuthorWatcher() {
  yield takeLatest(getAuthorsAsync, getAllAuthorWorker)
}