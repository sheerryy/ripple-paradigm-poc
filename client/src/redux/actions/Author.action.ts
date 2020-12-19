import { AuthorsResponse } from "../../types/dtos";

export type AuthorActionsType = 'GET_AUTHORS' | 'SET_AUTHORS' | 'CLEAR_AUTHORS';

export function typedAction(type: AuthorActionsType, payload?: any) {
  return { type, payload };
}

export const getAuthors = () => typedAction('GET_AUTHORS');

export const setAuthors = (authors: AuthorsResponse) => typedAction('SET_AUTHORS', authors);

export const clearAuthors = () => typedAction('CLEAR_AUTHORS');

export type AuthorAction = ReturnType<typeof getAuthors | typeof setAuthors | typeof clearAuthors>;