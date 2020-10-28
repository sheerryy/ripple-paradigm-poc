import { AuthorsResponse } from '../authors/authors.response.dto';

export type ReportsResponse = {
  id: number;

  title: string;

  data: {
    heading: string;

    paragraph: string;
  }[];

  Author: AuthorsResponse;
};