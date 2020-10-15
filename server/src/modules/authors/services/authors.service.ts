import { ErrorResponse} from "@utils/types";

import { Authors } from "../entities/authors";

export class AuthorsService {
    private authors: Authors[];

    constructor() {
        this.authors = [];
    }

    getAuthor(id: number): Authors | undefined {
        return this.authors.find((author) => author.id === id);
    }

    getAuthorByIds(ids: number[]): Authors[] {
        return this.authors.filter((author) => ids.indexOf(author.id) !== -1);
    }

    getAuthors(): Authors[] {
        return this.authors;
    }

    createAuthor(author: Partial<Authors>): Authors | ErrorResponse {
        // TODO: move this part to joi validatation wwith custom error messages
        if (!author.name) {
            return {
                status: 400,
                errorCode: 's-002-c-001',
                message: 'name is required.'
            };
        }

        const newAuthor: Authors = {
            id: this.authors.length,
            name: author.name,
            createdAt: new Date(),
        };

        this.authors = [...this.authors, newAuthor];

        return newAuthor;
    }

    updateAuthor(id: number, author: Partial<Authors>): Authors | ErrorResponse {
        const authorIndex = this.authors.findIndex((item) => item.id === id);

        if (authorIndex === -1) {
            return {
                status: 404,
                errorCode: 's-002-u-001',
                message: 'Author not found.'
            };
        }

        this.authors[authorIndex] = {...this.authors[authorIndex], ...author, updatedAt: new Date() };

        return this.authors[authorIndex];
    }

    deleteAuthor(id: number): ErrorResponse | void {
        const authorIndex = this.authors.findIndex((author) => author.id === id);

        if (authorIndex === -1) {
            return {
                status: 404,
                errorCode: 's-002-d-001',
                message: 'Author not found.'
            };
        }

        this.authors = this.authors.filter((author) => author.id !== id);
    }
}