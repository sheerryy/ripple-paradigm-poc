import {Request, Response} from 'express';

import { ErrorResponse } from "@utils/types";

import { Reports } from "../entities/reports";
import { ReportsService } from "../services/reports.service";

export class ReportsController {
    reportService: ReportsService;

    constructor() {
        this.reportService = new ReportsService();
    }

    getReport = (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                code: 'c-001-g-001',
                message: 'id is not specified.'
            });
        }

        const response = this.reportService.getReport(Number(id));

        if(!response) {
            return res.status(404).json({
                code: 'c-001-g-002',
                message: 'report not found.'
            });
        }

        res.status(200).json({
            data: response
        });
    };

    getReports = (req: Request, res: Response) => {
        const response = this.reportService.getReports();

        res.status(200).json({
            data: response
        });
    };

    createReport = (req: Request, res: Response) => {
        const {
            data,
            title,
            author,
        } = req.body;

        const report: Partial<Reports> = {
            title,
            data,
            author
        };

        const response: any = this.reportService.createReport(report);

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(200).json({
            data: response
        });
    };

    updateReport = (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            data,
            title,
            author,
        } = req.body;

        const report: Partial<Reports> = {
            title,
            data,
            author
        };

        const response: any = this.reportService.updateReport(Number(id), report);

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(200).json({
            message: 'report updated successfully.'
        });
    };

    deleteReport = (req: Request, res: Response) => {
        const { id } = req.params;

        const response: any = this.reportService.deleteReport(Number(id));

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(200).json({
            message: 'report deleted successfully.'
        });
    };
}