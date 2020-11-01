import axios from 'axios';
import * as qs from 'querystring';

export const doGet = async (path: string, params = {}) => {
  return axios({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    url: `${path}?${qs.stringify(params)}`,
  });
};

export const doPost = async (path: string, body = {}, params = {}) => {
  return axios({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    url: `${path}?${qs.stringify(params)}`,
    data: body,
  });
};

export const doPut = async (path: string, body = {}, params = {}) => {
  return axios({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    url: `${path}?${qs.stringify(params)}`,
    data: body,
  });
};

export const doDelete = async (path: string, params = {}) => {
  return axios({
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    url: `${path}?${qs.stringify(params)}`,
  });
};

