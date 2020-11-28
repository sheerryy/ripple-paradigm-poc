import { getConfig } from "../../config";
import {doDelete, doGet, doPost, doPut} from "../../utils";

import { ErrorResponse } from "../../types/responses";
import { AuthorsRequest, AuthorsResponse } from "../../types/dtos";

const config = getConfig();

export const getAuthors =  async (): Promise<AuthorsResponse[] | ErrorResponse> => {
    let authors: AuthorsResponse[];

    const response =  await doGet(`${config.API_BASE_URL}authors/`);

    if (response.error) {
      return response.errorResponse as ErrorResponse;
    }

    authors = response.data;

    return authors;
};

export const getAuthor =  async (id: string): Promise<AuthorsResponse | ErrorResponse> => {
    let author: AuthorsResponse;

    const response =  await doGet( `${config.API_BASE_URL}authors/${id}`);

    if (response.error) {
        return response.errorResponse as ErrorResponse;
    }

    author = { ...response.data };

    return author;
};

export const createAuthor =  async (authorDto: AuthorsRequest): Promise<AuthorsResponse | ErrorResponse> => {
    let author: AuthorsResponse;

    const response =  await doPost( `${config.API_BASE_URL}authors/`, authorDto);

    if (response.error) {
        return response.errorResponse as ErrorResponse;
    }

    author = { ...response.data };

    return author;
};

export const updateAuthor =  async (id: string, authorDto: Partial<AuthorsRequest>): Promise<AuthorsResponse | ErrorResponse> => {
  let author: AuthorsResponse;

  const response =  await doPut( `${config.API_BASE_URL}authors/${id}`, authorDto);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  author = { ...response.data };

  return author;
};

const deleteAuthor =  async (id: string): Promise<AuthorsResponse | ErrorResponse> => {
  let author: AuthorsResponse;

  const response =  await doDelete( `${config.API_BASE_URL}authors/${id}`);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  author = { ...response.data };

  return author;
};