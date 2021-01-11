import { call, put } from 'redux-saga/effects';

import {
  ReportsResponse,
} from '../../types/dtos';
import {
  setReports as setReportsAction,
  clearReports as clearReportsAction,
} from '../actions/Report.action';
import {
  getReports as getReportsApi,
} from '../../apis/reports/reports.api';

export function* getAllReportWorker() {
  try {
    const result = yield call(getReportsApi);

    if (result.errorCode) {
      throw new Error(result.message)
    }

    yield put(setReportsAction(result as ReportsResponse[]))
  } catch (err) {
    yield put(clearReportsAction())
  }
}