import {
  CLEAR_REPORTS,
  GET_REPORTS_FAIL,
  GET_REPORTS_SUCCESS,
  ReportActionType,
  ReportState,
  SET_REPORTS,
} from '../types/Report.type';

export const initialReportState: ReportState = {
  reports: [],
  error: null,
}

export function reportReducer(
  state = initialReportState,
  action: ReportActionType
): ReportState {
  switch (action.type) {
    case GET_REPORTS_SUCCESS:
      return { ...state, reports: action.payload, error: null };
    case GET_REPORTS_FAIL:
      return { ...state, reports: [], error: action.payload };
    case SET_REPORTS:
      return { ...state, reports: action.payload };
    case CLEAR_REPORTS:
      return { ...state, reports: [] };
    default:
      return state;
  }
}