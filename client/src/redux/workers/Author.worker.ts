import { call, put } from 'redux-saga/effects';

import {
  clearAuthors,
  getAuthorsFail as getAuthorsFailAction,
  getAuthorsSuccess as getAuthorsSuccessAction,
} from '../actions/Author.action';
import {
  getAuthors as getAuthorsApi,
} from '../../apis/authors/authors.api';
import { AuthorsResponse,} from '../../types/dtos';
import { ErrorResponse } from '../../types/responses';

export function* getAllAuthorWorker() {
  try {
    yield put(clearAuthors())
    const result = yield call(getAuthorsApi);

    if (result.errorCode) {
      throw (result.message)
    }

    yield put(getAuthorsSuccessAction(result as AuthorsResponse[]))
  } catch (err) {
    yield put(getAuthorsFailAction(err as ErrorResponse))
  }
}