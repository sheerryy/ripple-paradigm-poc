import {
  AuthorState,
  GET_AUTHORS,
  SET_AUTHORS,
  CLEAR_AUTHORS,
  AuthorActionType,
} from '../types/Author.type';

const initialState: AuthorState = {
  authors: []
}

export function authorReducer(
  state = initialState,
  action: AuthorActionType
): AuthorState {
  switch (action.type) {
    case GET_AUTHORS:
      return { ...state, authors: state.authors };
    case SET_AUTHORS:
      return { ...state, authors: action.payload };
    case CLEAR_AUTHORS:
      return { ...state, authors: [] };
    default:
      return state;
  }
}