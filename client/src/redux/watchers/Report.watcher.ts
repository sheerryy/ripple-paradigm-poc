import { takeLatest } from 'redux-saga/effects';

import {GET_REPORTS_ASYNC} from "../types/Report.type";
import { getAllReportWorker } from '../workers/Report.worker';

export function* getAllReportWatcher() {
  yield takeLatest(GET_REPORTS_ASYNC, getAllReportWorker)
}
