import { AuthorsResponse } from './authors.response.dto';

import { AuthorEntity } from '@modules/authors';

export const authorsToAuthorResponse = (author: AuthorEntity): AuthorsResponse => {
  return {
    id: author.id,
    name: author.name,
  };
};