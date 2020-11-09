import { AuthorsResponse } from "../../types/dtos";
import { ErrorResponse } from "../../types/responses";
import { doGet } from "../../utils";
import { getConfig } from "../../config";

const config = getConfig();

const getAuthors =  async (): Promise<AuthorsResponse[] | ErrorResponse> => {
    let authors: AuthorsResponse[];

    const response =  await doGet(`${config.API_BASE_URL}authors/`);

    if (response.error) {
      return response.errorResponse as ErrorResponse;
    }

    authors = response.data;

    return authors;
};