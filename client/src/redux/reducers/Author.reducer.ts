import { AuthorState } from "../types/Author.type";
import { AuthorAction } from "../actions/Author.action";

const initialState: AuthorState = {
  authors: []
}

export function authorReducer(
  state = initialState,
  action: AuthorAction
): AuthorState {
  switch (action.type) {
    case 'GET_AUTHORS':
      return { authors: state.authors };
    case 'SET_AUTHORS':
      return { authors: action.payload };
    case 'CLEAR_AUTHORS':
      return { authors: [] };
    default:
      return state;
  }
}