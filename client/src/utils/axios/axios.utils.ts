import axios from 'axios';
import * as qs from 'querystring';
import {ErrorResponse} from "../../types/responses";

export const doGet = async (path: string, params = {}): Promise<any | ErrorResponse> => {
  try {
    const response = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
    });

    return response?.data?.data;
  } catch (err) {
    console.log(err);

    return err?.response?.data as ErrorResponse;
  }
};

export const doPost = async (path: string, body = {}, params = {}) => {
  try {
    const response = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
      data: body,
    });

    return response?.data?.data;
  } catch (err) {
    console.log(err);

    return err?.response?.data as ErrorResponse;
  }
};

export const doPut = async (path: string, body = {}, params = {}) => {
  try {
    const response = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
      data: body,
    });

    return response?.data?.data;
  } catch (err) {
    console.log(err);

    return err?.response?.data as ErrorResponse;
  }
};

export const doDelete = async (path: string, params = {}) => {
  try {
    const response = await axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      url: `${path}?${qs.stringify(params)}`,
    });

    return response?.data?.data;
  } catch (err) {
    console.log(err);

    return err?.response?.data as ErrorResponse;
  }
};

