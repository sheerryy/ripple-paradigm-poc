import { AuthorsResponse } from '../authors/authors-response.type';

export type ReportsResponse = {
  id: string;

  title: string;

  data: {
    heading: string;

    paragraph: string;
  }[];

  Author: AuthorsResponse;
};