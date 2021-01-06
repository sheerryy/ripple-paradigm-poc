import { AuthorsResponse } from '../../types/dtos';

export const GET_AUTHORS = 'GET_AUTHORS';
export const SET_AUTHORS = 'SET_AUTHORS';
export const CLEAR_AUTHORS = 'CLEAR_AUTHORS';
export const CREATE_AUTHOR_SUCCESS = 'CREATE_AUTHOR_SUCCESS';
export const CREATE_AUTHOR_FAIL = 'CREATE_AUTHOR_FAIL';
export const GET_AUTHORS_ASYNC = 'GET_AUTHORS_ASYNC';
export const CREATE_AUTHOR_ASYNC = 'CREATE_AUTHOR_ASYNC';


export type AuthorState = {
  authors: AuthorsResponse[],
  newAuthor: AuthorsResponse | null,
};

interface GetAuthorsAction {
  type: typeof GET_AUTHORS;
}

interface SetAuthorsAction {
  type: typeof SET_AUTHORS;
  payload: AuthorsResponse[];
}

interface ClearAuthorsAction {
  type: typeof CLEAR_AUTHORS;
}

interface CreateAuthorSuccessAction {
  type: typeof CREATE_AUTHOR_SUCCESS;
}

interface CreateAuthorFailAction {
  type: typeof CREATE_AUTHOR_FAIL;
}

interface GetAuthorsAsyncAction {
  type: typeof GET_AUTHORS_ASYNC;
}

interface CreateAuthorAsyncAction {
  type: typeof CREATE_AUTHOR_ASYNC;
}

export type AuthorActionType = GetAuthorsAction
  | SetAuthorsAction
  | ClearAuthorsAction
  | CreateAuthorSuccessAction
  | CreateAuthorFailAction
  | GetAuthorsAsyncAction
  | CreateAuthorAsyncAction;
