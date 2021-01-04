import { call, put } from 'redux-saga/effects';

import { AuthorsResponse } from "../../types/dtos";
import { getAuthors as getAuthorsApi } from '../../apis/authors/authors.api';
import { setAuthors as setAuthorsAction, clearAuthors as clearAuthorsAction } from "../actions/Author.action";

export function* getAllAuthorWorker() {
  try {
    const result = yield call(getAuthorsApi);

    if (result.errorCode) {
      throw new Error(result.message)
    }

    yield put(setAuthorsAction(result as AuthorsResponse[]))
  } catch (err) {
    yield put(clearAuthorsAction())
  }
}