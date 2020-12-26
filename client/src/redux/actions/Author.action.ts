import {AuthorsResponse} from '../../types/dtos';
import {AuthorActionType, CLEAR_AUTHORS, GET_AUTHORS, SET_AUTHORS} from '../types/Author.type';


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