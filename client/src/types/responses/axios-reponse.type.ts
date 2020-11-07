import { ErrorResponse } from "./error-response.type";

export type AxiosUtilResponse = {
  error: boolean

  data?: any;

  errorResponse?: ErrorResponse
};