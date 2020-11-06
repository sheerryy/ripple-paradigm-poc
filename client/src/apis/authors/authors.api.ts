import { AuthorsResponse } from "../../types/dtos";
import { ErrorResponse } from "../../types/responses";
import { doGet } from "../../utils";
import { getConfig } from "../../config";

const config = getConfig();

const getAuthors =  async (): Promise<AuthorsResponse[] | ErrorResponse> => {
    let authors;

    try {
      authors = await doGet(`${config.API_BASE_URL}authors/`)
    } catch (err) {
      console.log(err);

    }
}