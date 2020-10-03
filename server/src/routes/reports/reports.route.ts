import { Router } from 'express';

import { ReportsController } from "@modules/reports";

const router = Router();
const controller = new ReportsController();

router.get('/:id', controller.getReport);

router.get('/', controller.getReports);

router.post('/', controller.createReport);

router.put('/:id', controller.updateReport);

router.delete('/:id', controller.deleteReport);

export default router;