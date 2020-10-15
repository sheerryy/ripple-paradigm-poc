import { Request, Response } from 'express';

import { ErrorResponse } from "@utils/types";

import { Reports } from "../entities/reports";
import { ReportsService } from "../services/reports.service";
import {AuthorsService} from "@modules/authors";
import {ReportsResponse, reportsToReportResponse} from "@dtos/index";

export class ReportsController {
    reportService: ReportsService;
    authorService: AuthorsService;

    constructor() {
        this.reportService = new ReportsService();
        this.authorService = new AuthorsService();
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
                message: 'Report not found.'
            });
        }

        const data: ReportsResponse = reportsToReportResponse(response, this.authorService.getAuthor(response.authorId));

        res.status(200).json({
            data
        });
    }

    getReports = (req: Request, res: Response) => {
        const response = this.reportService.getReports();

        const authors = this.authorService.getAuthorByIds(response.map((report) => report.id));

        const data: ReportsResponse[] = response.map(
          (report) => reportsToReportResponse(report, authors.find(
            (author) => report.authorId === author.id)
          )
        );

        res.status(200).json({
            data
        });
    }

    createReport = (req: Request, res: Response) => {
        const {
            data,
            title,
            authorId,
        } = req.body;

        const report: Partial<Reports> = {
            title,
            data,
            authorId,
        };

        const author = this.authorService.getAuthor(report.authorId);

        if (!author) {
            return res.status(404).json({
                errorCode: 'c-001-c-001',
                message: 'Author not found.'
            });
        }

        const response: any = this.reportService.createReport(report);

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        const reportsResponse: ReportsResponse = reportsToReportResponse(response, author);

        res.status(201).json({
            data: reportsResponse
        });
    }

    updateReport = (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            data,
            title,
            authorId,
        } = req.body;

        const report: Partial<Reports> = {
            title,
            data,
            authorId
        };

        if (report.authorId) {
            const author = this.authorService.getAuthor(report.authorId);

            if (!author) {
                return res.status(404).json({
                    errorCode: 'c-001-u-001',
                    message: 'Author not found.'
                });
            }
        }

        const response: any = this.reportService.updateReport(Number(id), report);

        if (response?.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(200).json({
            message: 'Report updated successfully.',
            data: response,
        });
    }

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

        res.status(204).json({
            message: 'Report deleted successfully.'
        });
    }
}