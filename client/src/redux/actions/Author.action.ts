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
import { AuthorsResponse } from '../../types/dtos';

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

export const createAuthorSuccess = (): AuthorActionType => {
  return {
    type: CREATE_AUTHOR_SUCCESS,
  };
};

export const createAuthorFail = (): AuthorActionType => {
  return {
    type: CREATE_AUTHOR_FAIL,
  };
};

export const getAuthorsAsync = (): AuthorActionType => {
  return {
    type: GET_AUTHORS_ASYNC,
  };
};

export const createAuthorAsync = (): AuthorActionType => {
  return {
    type: CREATE_AUTHOR_ASYNC,
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