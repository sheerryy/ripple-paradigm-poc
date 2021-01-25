import {
  AuthorActionType,
  AuthorState,
  CLEAR_AUTHORS,
  GET_AUTHORS_FAIL,
  GET_AUTHORS_SUCCESS,
  SET_AUTHORS,
} from '../types/Author.type';

export const initialAuthorState: AuthorState = {
  authors: [],
  error: null
}

export function authorReducer(
  state = initialAuthorState,
  action: AuthorActionType
): AuthorState {
  switch (action.type) {
    case GET_AUTHORS_SUCCESS:
      return { ...state, authors: action.payload, error: null };
    case GET_AUTHORS_FAIL:
      return { ...state, authors: [], error: action.payload };
    case SET_AUTHORS:
      return { ...state, authors: action.payload };
    case CLEAR_AUTHORS:
      return { ...state, authors: [] };
    default:
      return state;
  }
}