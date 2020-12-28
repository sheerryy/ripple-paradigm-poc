import { ReportsResponse } from '../../types/dtos';

export const GET_REPORTS = 'GET_REPORTS';
export const SET_REPORTS = 'SET_REPORTS';
export const CLEAR_REPORTS = 'CLEAR_REPORTS';

export type ReportState = {
  reports: ReportsResponse[]
};

interface GetReportsAction {
  type: typeof GET_REPORTS;
}

interface SetReportsAction {
  type: typeof SET_REPORTS;
  payload: ReportsResponse[];
}

interface ClearReportsAction {
  type: typeof CLEAR_REPORTS;
}

export type ReportActionType = GetReportsAction | SetReportsAction | ClearReportsAction;

