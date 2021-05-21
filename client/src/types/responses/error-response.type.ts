export type ErrorResponse = {
  status: number;

  errorCode: string;

  message: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  data?: object;
};
