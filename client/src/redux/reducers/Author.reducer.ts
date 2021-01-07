import {
  AuthorState,
  GET_AUTHORS,
  SET_AUTHORS,
  CLEAR_AUTHORS,
  AuthorActionType,
} from '../types/Author.type';
import { AuthorsResponse } from '../../types/dtos';

export const initialAuthorState: AuthorState = {
  authors: [],
  newAuthor: null
}

export function authorReducer(
  state = initialAuthorState,
  action: AuthorActionType
): AuthorState {
  switch (action.type) {
    case GET_AUTHORS:
      return { ...state, authors: state.authors };
    case SET_AUTHORS:
      return { ...state, authors: action.payload as AuthorsResponse[] };
    case CLEAR_AUTHORS:
      return { ...state, authors: [] };
    default:
      return state;
  }
}