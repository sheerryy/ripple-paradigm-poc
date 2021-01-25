import { takeLatest } from 'redux-saga/effects';

import { GET_AUTHORS_ASYNC } from '../types/Author.type';
import { getAllAuthorWorker } from '../workers/Author.worker';

export function* getAllAuthorWatcher() {
  yield takeLatest(GET_AUTHORS_ASYNC, getAllAuthorWorker)
}