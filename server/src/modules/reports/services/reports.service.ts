import { ErrorResponse} from "@utils/types";

import { Reports } from "../entities/reports";

export class ReportsService {
    private static instance: ReportsService;
    private reports: Reports[];

    constructor() {
    }

    static getInstance() {
        if (!ReportsService.instance) {
            ReportsService.instance = new ReportsService();
            ReportsService.instance.reports = [];
        }
        return ReportsService.instance;
    }

    getReport(id: string): Reports | undefined {
        return this.reports.find((report) => report.id === id);
    }

    getReports(): Reports[] {
        return this.reports;
    }

    createReport(report: Partial<Reports>): Reports | ErrorResponse {
        // TODO: move this part to joi validatation wwith custom error messages
        if (!report.title || !report.data) {
            return {
                status: 400,
                errorCode: 's-001-c-001',
                message: 'Title and data is required.'
            };
        }

        const newReport: Reports = {
            id: this.reports.length.toString(),
            title: report.title,
            data: report.data,
            authorId: report.authorId,
            createdAt: new Date(),
        };

        this.reports = [...this.reports, newReport];

        return newReport;
    }

    updateReport(id: string, report: Partial<Reports>): Reports | ErrorResponse {
        const reportIndex = this.reports.findIndex((item) => item.id === id);

        if (reportIndex === -1) {
            return {
                status: 404,
                errorCode: 's-001-u-001',
                message: 'Report not found.'
            };
        }

        this.reports[reportIndex] = {...this.reports[reportIndex], ...report, updatedAt: new Date() };

        return this.reports[reportIndex];
    }

    deleteReport(id: string): ErrorResponse | void {
        const reportIndex = this.reports.findIndex((report) => report.id === id);

        if (reportIndex === -1) {
            return {
                status: 404,
                errorCode: 's-001-d-001',
                message: 'Report not found.'
            };
        }

        this.reports = this.reports.filter((report) => report.id !== id);
    }
}