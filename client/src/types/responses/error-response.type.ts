export type ErrorResponse = {
  status: number;

  errorCode: string;

  message: string;

  data?: object;
};