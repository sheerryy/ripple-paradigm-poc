import axios from 'axios';
import * as qs from 'querystring';
import { AxiosUtilResponse, ErrorResponse } from "../../types/responses";
import {doJsonRequest} from "./axios.utils";

export const doGet = async (path: string, params = {}): Promise<AxiosUtilResponse> => {
    const response: AxiosUtilResponse = await doJsonRequest(
      'GET',
      `${path}?${qs.stringify(params)}`,
    );

    return response;
};

export const doPost = async (path: string, body = {}, params = {}): Promise<AxiosUtilResponse> => {
  const response: AxiosUtilResponse = await doJsonRequest(
    'POST',
    `${path}?${qs.stringify(params)}`,
    body,
  );

  return response;
};

export const doPut = async (path: string, body = {}, params = {}): Promise<AxiosUtilResponse> => {
  const response: AxiosUtilResponse = await doJsonRequest(
    'PUT',
    `${path}?${qs.stringify(params)}`,
    body,
  );

  return response;
};

export const doDelete = async (path: string, params = {}): Promise<AxiosUtilResponse> => {
  const response: AxiosUtilResponse = await doJsonRequest(
    'DELETE',
    `${path}?${qs.stringify(params)}`
  );

  return response;
};
