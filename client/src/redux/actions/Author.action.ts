import {
  GET_AUTHORS,
  SET_AUTHORS,
  CLEAR_AUTHORS,
  CREATE_AUTHOR_FAIL,
  CREATE_AUTHOR_SUCCESS,
  GET_AUTHORS_ASYNC,
  CREATE_AUTHOR_ASYNC,
  AuthorActionType,
} from '../types/Author.type';
import { ErrorResponse } from '../../types/responses';
import { AuthorsRequest, AuthorsResponse } from '../../types/dtos';

export const getAuthors = (): AuthorActionType => {
  return {
    type: GET_AUTHORS,
  };
};

export const setAuthors = (authors: AuthorsResponse[]): AuthorActionType => {
  return {
    type: SET_AUTHORS,
    payload: authors,
  };
};

export const clearAuthors = (): AuthorActionType => {
  return {
    type: CLEAR_AUTHORS,
  };
};

export const createAuthorSuccess = (author: AuthorsResponse): AuthorActionType => {
  return {
    type: CREATE_AUTHOR_SUCCESS,
    payload: author,
  };
};

export const createAuthorFail = (errorResponse: ErrorResponse): AuthorActionType => {
  return {
    type: CREATE_AUTHOR_FAIL,
    payload: errorResponse,
  };
};

export const getAuthorsAsync = (): AuthorActionType => {
  return {
    type: GET_AUTHORS_ASYNC,
  };
};

export const createAuthorAsync = (authorDto: AuthorsRequest): AuthorActionType => {
  return {
    type: CREATE_AUTHOR_ASYNC,
    payload: authorDto,
  };
};

export type AuthorActions = ReturnType<
  typeof getAuthors
  | typeof setAuthors
  | typeof clearAuthors
  | typeof createAuthorFail
  | typeof createAuthorSuccess
  | typeof getAuthorsAsync
  | typeof createAuthorAsync
>;