import {AxiosUtilResponse, ErrorResponse} from "../../types/responses";
import axios from "axios";

export const doJsonRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  body = {},
  headers = {}
  ): Promise<AxiosUtilResponse> => {
  try {
    const response = await axios({
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...headers
      },
      url,
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

      errorResponse: {
        ...err.response?.data as ErrorResponse,
        status: err.response?.status,
      }
    };

    return  axoisResponse;
  }
};