import { AuthorsResponse } from '../authors/authors-response.type';

export type ReportsResponse = {
  id: number;

  title: string;

  data: {
    heading: string;

    paragraph: string;
  }[];

  Author: AuthorsResponse;
};