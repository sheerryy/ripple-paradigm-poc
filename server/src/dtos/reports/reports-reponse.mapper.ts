import { ReportsResponse } from './reports.response.dto';

import { ReportEntity } from '@modules/reports';
import { AuthorEntity } from '@modules/authors';

export const reportsToReportResponse = (report: ReportEntity, author: AuthorEntity): ReportsResponse => {
  return {
    id: report.id,
    title: report.title,
    data: report.data,
    Author: {
      id: author.id,
      name: author.name,
    },
  };
};