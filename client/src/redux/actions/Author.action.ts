import {
  AuthorActionType,
  CLEAR_AUTHORS,
  GET_AUTHORS_ASYNC,
  GET_AUTHORS_FAIL,
  GET_AUTHORS_SUCCESS,
  SET_AUTHORS,
} from '../types/Author.type';
import { AuthorsResponse } from '../../types/dtos';
import { ErrorResponse } from '../../types/responses';

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

export const getAuthorsAsync = (): AuthorActionType => {
  return {
    type: GET_AUTHORS_ASYNC,
  };
};

export const getAuthorsSuccess = (authors: AuthorsResponse[]): AuthorActionType => {
  return {
    type: GET_AUTHORS_SUCCESS,
    payload: authors,
  };
};

export const getAuthorsFail = (error: ErrorResponse): AuthorActionType => {
  return {
    type: GET_AUTHORS_FAIL,
    payload: error,
  };
};

export type AuthorActions = ReturnType<
  | typeof setAuthors
  | typeof clearAuthors
  | typeof getAuthorsAsync
  | typeof getAuthorsSuccess
  | typeof getAuthorsFail
>;