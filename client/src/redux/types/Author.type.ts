import { ErrorResponse } from '../../types/responses';
import { AuthorsResponse } from '../../types/dtos';

export const SET_AUTHORS = 'SET_AUTHORS';
export const CLEAR_AUTHORS = 'CLEAR_AUTHORS';
export const GET_AUTHORS_ASYNC = 'GET_AUTHORS_ASYNC';
export const GET_AUTHORS_SUCCESS = 'GET_AUTHORS_SUCCESS';
export const GET_AUTHORS_FAIL = 'GET_AUTHORS_FAIL';


export type AuthorState = {
  authors: AuthorsResponse[],
  error: ErrorResponse | null,
};

interface SetAuthorsAction {
  type: typeof SET_AUTHORS;
  payload: AuthorsResponse[];
}

interface ClearAuthorsAction {
  type: typeof CLEAR_AUTHORS;
}

interface GetAuthorsAsyncAction {
  type: typeof GET_AUTHORS_ASYNC;
}


interface GetAuthorsSuccessAction {
  type: typeof GET_AUTHORS_SUCCESS;
  payload: AuthorsResponse[];
}


interface GetAuthorsFailAction {
  type: typeof GET_AUTHORS_FAIL;
  payload: ErrorResponse;
}


export type AuthorActionType =  SetAuthorsAction
  | ClearAuthorsAction
  | GetAuthorsAsyncAction
  | GetAuthorsSuccessAction
  | GetAuthorsFailAction;
