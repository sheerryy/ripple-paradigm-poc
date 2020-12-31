import {CLEAR_REPORTS, GET_REPORTS, ReportActionType, ReportState, SET_REPORTS,} from '../types/Report.type';

export const initialReportState: ReportState = {
  reports: []
}

export function reportReducer(
  state = initialReportState,
  action: ReportActionType
): ReportState {
  switch (action.type) {
    case GET_REPORTS:
      return { ...state, reports: state.reports };
    case SET_REPORTS:
      return { ...state, reports: action.payload };
    case CLEAR_REPORTS:
      return { ...state, reports: [] };
    default:
      return state;
  }
}