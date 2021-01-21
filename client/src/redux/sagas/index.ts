import { all } from 'redux-saga/effects';

import { getAllAuthorWatcher } from '../watchers/Author.watcher';
import { getAllReportWatcher } from '../watchers/Report.watcher';

export default function* rootSaga() {
  yield all([
    getAllAuthorWatcher(),
    getAllReportWatcher()
  ])
}