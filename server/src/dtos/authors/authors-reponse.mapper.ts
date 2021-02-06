import { AuthorEntity } from '@modules/authors';
import { AuthorsResponse } from './authors.response.dto';

export const authorsToAuthorResponse = (author: AuthorEntity): AuthorsResponse => ({
  id: author.id,
  name: author.name,
});
