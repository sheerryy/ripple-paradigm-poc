import { Request, Response } from 'express';

import { DependentContext, ErrorResponse } from '@utils/types';
import { AuthorsResponse, authorsToAuthorResponse } from '@dtos/index';

import { Authors } from "../entities/authors";
import { AuthorsService } from "../services/authors.service";

export class AuthorsController {
    authorsService: AuthorsService;

    constructor() {
        this.authorsService = AuthorsService.getInstance();
    }

    getAuthor = (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                code: 'c-002-g-001',
                message: 'id is not specified.'
            });
        }

        const response = this.authorsService.getAuthor(id);

        if(!response) {
            return res.status(404).json({
                code: 'c-002-g-002',
                message: 'Author not found.'
            });
        }

        const data: AuthorsResponse = authorsToAuthorResponse(response);

        res.status(200).json({
            data
        });
    }

    getAuthors = (req: Request, res: Response) => {
        const response = this.authorsService.getAuthors();

        const data: AuthorsResponse[] = response.map((author) => authorsToAuthorResponse(author));

        res.status(200).json({
            data
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

        const data: AuthorsResponse = authorsToAuthorResponse(response);

        res.status(201).json({
            data
        });
    }

    updateAuthor = (req: Request, res: Response) => {
        const { id } = req.params;
        const { name } = req.body;

        const author: Partial<Authors> = { name };

        const response: any = this.authorsService.updateAuthor(id, author);

        if (response?.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        const data: AuthorsResponse = authorsToAuthorResponse(response);

        const dependentContexts: DependentContext[] = [
            {
                id,
                context: 'authors',
                requestMethod: 'PUT',
            }
        ];

        res.locals = { dependentContexts };

        res.status(200).json({
            message: 'Author updated successfully.',
            data
        });
    }

    deleteAuthor = (req: Request, res: Response) => {
        const { id } = req.params;

        const response: any = this.authorsService.deleteAuthor(id);

        if (response.errorCode) {
            const errorResponse = response as ErrorResponse;

            return res.status(errorResponse.status).json({
                code: errorResponse.errorCode,
                message: errorResponse.message
            });
        }

        const dependentContext: DependentContext[] = [
          {
            id,
            context: 'authors',
            requestMethod: 'DELETE',
          }
        ];

        res.locals = { dependentContext };

        res.status(204).json({
            message: 'Author deleted successfully.'
        });
    }
}