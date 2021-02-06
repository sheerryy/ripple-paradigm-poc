import { Router } from 'express';

import { AuthorsController } from '@modules/authors';

const router = Router();
const controller = new AuthorsController();

router.get('/:id', controller.getAuthor);

router.get('/', controller.getAuthors);

router.post('/', controller.createAuthor);

router.put('/:id', controller.updateAuthor);

router.delete('/:id', controller.deleteAuthor);

export default router;
