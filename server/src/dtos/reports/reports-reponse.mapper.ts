import { ReportEntity } from '@modules/reports';
import { AuthorEntity } from '@modules/authors';
import { ReportsResponse } from './reports.response.dto';

export const reportsToReportResponse = (report: ReportEntity, author: AuthorEntity): ReportsResponse => ({
  id: report.id,
  title: report.title,
  data: report.data,
  Author: {
    id: author.id,
    name: author.name,
  },
});
