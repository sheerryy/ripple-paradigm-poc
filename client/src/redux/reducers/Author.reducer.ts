import {AuthorActionType, AuthorState, CLEAR_AUTHORS, GET_AUTHORS, SET_AUTHORS,} from '../types/Author.type';

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