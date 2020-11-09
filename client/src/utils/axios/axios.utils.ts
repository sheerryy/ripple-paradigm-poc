import axios from 'axios';
import * as qs from 'querystring';
import { AxiosUtilResponse, ErrorResponse } from "../../types/responses";

export const doGet = async (path: string, params = {}): Promise<AxiosUtilResponse> => {
  try {
    const response = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
    });

    const axoisResponse: AxiosUtilResponse = {
      error: false,

      data: response?.data?.data,
    };

    return axoisResponse;
  } catch (err) {
    console.log(err);

    const axoisResponse: AxiosUtilResponse = {
      error: true,

      errorResponse: err?.response?.data as ErrorResponse,
    };

    return  axoisResponse;
  }
};

export const doPost = async (path: string, body = {}, params = {}): Promise<AxiosUtilResponse> => {
  try {
    const response = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
      data: body,
    });

    const axoisResponse: AxiosUtilResponse = {
      error: false,

      data: response?.data?.data,
    };

    return axoisResponse;
  } catch (err) {
    console.log(err);

    const axoisResponse: AxiosUtilResponse = {
      error: true,

      errorResponse: err?.response?.data as ErrorResponse,
    };

    return  axoisResponse;
  }
};

export const doPut = async (path: string, body = {}, params = {}): Promise<AxiosUtilResponse> => {
  try {
    const response = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
      data: body,
    });

    const axoisResponse: AxiosUtilResponse = {
      error: false,

      data: response?.data?.data,
    };

    return axoisResponse;
  } catch (err) {
    console.log(err);

    const axoisResponse: AxiosUtilResponse = {
      error: true,

      errorResponse: err?.response?.data as ErrorResponse,
    };

    return  axoisResponse;
  }
};

export const doDelete = async (path: string, params = {}): Promise<AxiosUtilResponse> => {
  try {
    const response = await axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
    });

    const axoisResponse: AxiosUtilResponse = {
      error: false,

      data: response?.data?.data,
    };

    return axoisResponse;
  } catch (err) {
    console.log(err);

    const axoisResponse: AxiosUtilResponse = {
      error: true,

      errorResponse: err?.response?.data as ErrorResponse,
    };

    return  axoisResponse;
  }
};

