import { getConfig } from "../../config";
import { doDelete, doGet, doPost, doPut } from "../../utils";

import { ErrorResponse } from "../../types/responses";
import { ReportsRequest, ReportsResponse } from "../../types/dtos";

const config = getConfig();

export const getReports = async (): Promise<ReportsResponse[] | ErrorResponse> => {
  const response = await doGet(`${config.API_BASE_URL}reports/`);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  const reports = [...response.data] as ReportsResponse[];

  return reports;
};

export const getReport = async (id: string): Promise<ReportsResponse | ErrorResponse> => {
  const response = await doGet(`${config.API_BASE_URL}reports/${id}`);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  const report = {...response.data} as ReportsResponse;

  return report;
};

export const createReport = async (reportDto: ReportsRequest): Promise<ReportsResponse| ErrorResponse> => {
  const response = await doPost(`${config.API_BASE_URL}reports/`, reportDto);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  const report = {...response.data} as ReportsResponse;

  return report;
};

export const updateReport = async (id: string, reportDto: Partial<ReportsRequest>): Promise<ReportsResponse | ErrorResponse> => {
  const response = await doPut(`${config.API_BASE_URL}reports/${id}`, reportDto);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  const report = {...response.data} as ReportsResponse;

  return report;
};

export const deleteReport = async (id: string): Promise<ReportsResponse | ErrorResponse> => {
  const response = await doDelete(`${config.API_BASE_URL}reports/${id}`);

  if (response.error) {
    return response.errorResponse as ErrorResponse;
  }

  const report = {...response.data} as ReportsResponse;

  return report;
};
