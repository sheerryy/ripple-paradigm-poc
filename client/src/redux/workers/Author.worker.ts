import { call, put } from 'redux-saga/effects';

import {
  AuthorsRequest,
  AuthorsResponse,
} from '../../types/dtos';
import {
  setAuthors as setAuthorsAction,
  clearAuthors as clearAuthorsAction,
  createAuthorFail as createAuthorFailAction,
  createAuthorSuccess as createAuthorSuccessAction,
} from '../actions/Author.action';
import {
  getAuthors as getAuthorsApi,
  createAuthor as createAuthorApi,
} from '../../apis/authors/authors.api';
import {ErrorResponse} from "../../types/responses";

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

export function* createAuthorWorker(authorDto: AuthorsRequest) {
  try {
    const result = yield call(createAuthorApi, authorDto);

    if (result.errorCode) {
      throw (result)
    }

    yield put(createAuthorSuccessAction(result as AuthorsResponse))
  } catch (err) {
    yield put(createAuthorFailAction(err as ErrorResponse))
  }
}