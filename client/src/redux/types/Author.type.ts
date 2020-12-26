import { AuthorsResponse } from '../../types/dtos';

export const GET_AUTHORS = 'GET_AUTHORS';
export const SET_AUTHORS = 'SET_AUTHORS';
export const CLEAR_AUTHORS = 'CLEAR_AUTHORS';

export type AuthorState = {
  authors: AuthorsResponse[]
};

interface GetAuthorsAction {
  type: typeof GET_AUTHORS
}

interface SetAuthorsAction {
  type: typeof SET_AUTHORS
  payload: AuthorsResponse[]
}

interface ClearAuthorsAction {
  type: typeof CLEAR_AUTHORS
}

export type AuthorActionType = GetAuthorsAction | SetAuthorsAction | ClearAuthorsAction;
