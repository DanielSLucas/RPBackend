import { Router } from 'express';

import RentsController from '../controllers/RentsController';
import RentsForTheWeekController from '../controllers/RentsForTheWeekController';
import RentsByProductController from '../controllers/RentsByProductController';

const rentsController = new RentsController();
const rentsForTheWeekController = new RentsForTheWeekController();
const rentsByProductController = new RentsByProductController();

const rentsRouter = Router();

rentsRouter.get('/', rentsController.index);
rentsRouter.get('/week/', rentsForTheWeekController.index);
rentsRouter.get('/product/:id', rentsByProductController.index);

rentsRouter.get('/:id', rentsController.show);
rentsRouter.post('/', rentsController.create);
rentsRouter.put('/:id', rentsController.update);
rentsRouter.delete('/:id', rentsController.delete);

export default rentsRouter;
