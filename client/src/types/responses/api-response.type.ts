export type ApiResponse = {
  status: number;

  errorCode: string;

  message: string;

  data?: object;
};