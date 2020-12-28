import {
  GET_AUTHORS,
  SET_AUTHORS,
  CLEAR_AUTHORS,
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

export type AuthorActions = ReturnType<typeof getAuthors | typeof setAuthors | typeof clearAuthors>;