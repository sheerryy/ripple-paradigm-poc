import { call, put } from 'redux-saga/effects';

import {
  ReportsResponse,
} from '../../types/dtos';
import {
  getReportsSuccess as getReportsSuccessAction,
  getReportsFail as getReportsFailAction, clearReports,
} from '../actions/Report.action';
import {
  getReports as getReportsApi,
} from '../../apis/reports/reports.api';
import { ErrorResponse } from '../../types/responses';

export function* getAllReportWorker() {
  try {
    yield put(clearReports())
    const result = yield call(getReportsApi);

    if (result.errorCode) {
      throw (result.message)
    }

    yield put(getReportsSuccessAction(result as ReportsResponse[]))
  } catch (err) {
    yield put(getReportsFailAction(err as ErrorResponse))
  }
}