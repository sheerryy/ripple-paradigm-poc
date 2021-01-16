import { call, put } from 'redux-saga/effects';

import {
  AuthorsRequest,
  AuthorsResponse,
} from '../../types/dtos';
import {
  getAuthorsFail as getAuthorsFailAction,
  getAuthorsSuccess as getAuthorsSuccessAction,
} from '../actions/Author.action';
import {
  getAuthors as getAuthorsApi,
} from '../../apis/authors/authors.api';
import { ErrorResponse } from '../../types/responses';

export function* getAllAuthorWorker() {
  try {
    const result = yield call(getAuthorsApi);

    if (result.errorCode) {
      throw (result.message)
    }

    yield put(getAuthorsSuccessAction(result as AuthorsResponse[]))
  } catch (err) {
    yield put(getAuthorsFailAction(err as ErrorResponse))
  }
}