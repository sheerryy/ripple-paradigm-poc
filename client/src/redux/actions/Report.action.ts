import {
  GET_REPORTS,
  SET_REPORTS,
  CLEAR_REPORTS,
  ReportActionType,
} from '../types/Report.type';
import { ReportsResponse } from '../../types/dtos';

export const getReports = (): ReportActionType => {
  return {
    type: GET_REPORTS,
  };
};

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

export type ReportActions = ReturnType<typeof getReports | typeof setReports | typeof clearReports>;