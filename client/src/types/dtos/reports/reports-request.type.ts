export type ReportsRequest = {
  title: string;

  data: {
    heading: string;

    paragraph: string;
  }[];

  authorId: string;
};