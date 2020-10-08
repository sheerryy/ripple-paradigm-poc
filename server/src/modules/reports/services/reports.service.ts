import { ErrorResponse} from "@utils/types";

import { Reports } from "../entities/reports";

export class ReportsService {
    private reports: Reports[];

    constructor() {
        this.reports = []
    }

    getReport(id: number): Reports | undefined {
        return this.reports.find((report) => report.id === id);
    }

    getReports(): Reports[] {
        return this.reports;
    }

    createReport(report: Partial<Reports>): Reports | ErrorResponse {
        // TODO: move this part to joi validatation wwith custom error messages
        if (!report.title || !report.data || !report.author) {
            return {
                status: 400,
                errorCode: 's-001-c-001',
                message: 'title, author and data is required.'
            }
        }

        const newReport: Reports = {
            id: this.reports.length,
            title: report.title,
            data: report.data,
            author: report.author,
            createdAt: new Date(),
        };

        this.reports = [...this.reports, newReport];

        return newReport;
    }

    updateReport(id: number, report: Partial<Reports>): Reports | ErrorResponse {
        const reportIndex = this.reports.findIndex((item) => item.id === id);

        if (reportIndex === -1) {
            return {
                status: 404,
                errorCode: 's-001-u-001',
                message: 'Report not found.'
            }
        }

        this.reports[reportIndex] = {...this.reports[reportIndex], ...report, updatedAt: new Date() };

        return this.reports[reportIndex];
    }

    deleteReport(id: number): ErrorResponse | void {
        const reportIndex = this.reports.findIndex((report) => report.id === id);

        if (reportIndex === -1) {
            return {
                status: 404,
                errorCode: 's-001-d-001',
                message: 'Report not found.'
            }
        }

        this.reports = this.reports.filter((report) => report.id !== id);
    }
}