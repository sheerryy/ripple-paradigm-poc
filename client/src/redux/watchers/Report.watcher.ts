import { takeLatest } from 'redux-saga/effects';

import {
  getReportsAsync
} from '../actions/Report.action';
import { getAllReportWorker } from '../workers/Report.worker';

export function* getAllAuthorWatcher() {
  yield takeLatest(getReportsAsync, getAllReportWorker)
}
