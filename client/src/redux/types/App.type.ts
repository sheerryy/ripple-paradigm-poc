import { AuthorState } from './Author.type';
import { ReportState } from './Report.type';

export type AppState = {
  authors: AuthorState;
  reports: ReportState;
};