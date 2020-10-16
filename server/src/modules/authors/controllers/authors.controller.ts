import { Request, Response } from 'express';

import { ErrorResponse } from "@utils/types";

import { Authors } from "../entities/authors";
import { AuthorsService } from "../services/authors.service";

export class AuthorsController {
    authorsService: AuthorsService;

    constructor() {
        this.authorsService = new AuthorsService();
    }

    getAuthor = (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                code: 'c-002-g-001',
                message: 'id is not specified.'
            });
        }

        const response = this.authorsService.getAuthor(Number(id));

        if(!response) {
            return res.status(404).json({
                code: 'c-002-g-002',
                message: 'Author not found.'
            });
        }

        res.status(200).json({
            data: response
        });
    }

    getAuthors = (req: Request, res: Response) => {
        const response = this.authorsService.getAuthors();

        res.status(200).json({
            data: response
        });
    }

    createAuthor = (req: Request, res: Response) => {
        const { name } = req.body;

        const author: Partial<Authors> = { name };

        const response: any = this.authorsService.createAuthor(author);

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(201).json({
            data: response
        });
    }

    updateAuthor = (req: Request, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;

        const author: Partial<Authors> = { name };

        const response: any = this.authorsService.updateAuthor(Number(id), author);

        if (response?.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(200).json({
            message: 'Author updated successfully.',
            data: response,
        });
    }

    deleteAuthor = (req: Request, res: Response) => {
        const { id } = req.params;

        const response: any = this.authorsService.deleteAuthor(Number(id));

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        res.status(204).json({
            message: 'Author deleted successfully.'
        });
    }
}