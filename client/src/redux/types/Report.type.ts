import { ReportsResponse } from '../../types/dtos';

export const GET_REPORTS_ASYNC = 'GET_REPORTS_ASYNC';
export const GET_REPORTS_SUCCESS = 'GET_REPORTS_SUCCESS';
export const GET_REPORTS_FAIL = 'GET_REPORTS_FAIL';
export const SET_REPORTS = 'SET_REPORTS';
export const CLEAR_REPORTS = 'CLEAR_REPORTS';

export type ReportState = {
  reports: ReportsResponse[]
};

interface GetReportsAsyncAction {
  type: typeof GET_REPORTS_ASYNC;
}

interface GetReportsSuccessAction {
  type: typeof GET_REPORTS_SUCCESS;
}

interface GetReportsFailAction {
  type: typeof GET_REPORTS_FAIL;
}

interface SetReportsAction {
  type: typeof SET_REPORTS;
  payload: ReportsResponse[];
}

interface ClearReportsAction {
  type: typeof CLEAR_REPORTS;
}

export type ReportActionType = GetReportsAsyncAction
  | GetReportsSuccessAction
  | GetReportsFailAction
  | SetReportsAction
  | ClearReportsAction;

