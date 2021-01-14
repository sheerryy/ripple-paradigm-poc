import {
  GET_REPORTS_ASYNC,
  GET_REPORTS_FAIL,
  GET_REPORTS_SUCCESS,
  SET_REPORTS,
  CLEAR_REPORTS,
  ReportActionType,
} from '../types/Report.type';
import { ReportsResponse } from '../../types/dtos';
import { ErrorResponse } from '../../types/responses';

export const setReports = (reports: ReportsResponse[]): ReportActionType => {
  return {
    type: SET_REPORTS,
    payload: reports,
  };
};

export const clearReports = (): ReportActionType => {
  return {
    type: CLEAR_REPORTS,
  };
};

export const getReportsAsync = (): ReportActionType => {
  return {
    type: GET_REPORTS_ASYNC,
  };
};

export const getReportsFail = (error: ErrorResponse): ReportActionType => {
  return {
    type: GET_REPORTS_FAIL,
    payload: error,
  };
};

export const getReportsSuccess = (reports: ReportsResponse[]): ReportActionType => {
  return {
    type: GET_REPORTS_SUCCESS,
    payload: reports,
  };
};

export type ReportActions = ReturnType<
  typeof getReportsAsync |
  typeof getReportsFail |
  typeof getReportsSuccess |
  typeof setReports |
  typeof clearReports
  >;