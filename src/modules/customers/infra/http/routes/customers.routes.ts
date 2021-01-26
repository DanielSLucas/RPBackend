import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

const customersController = new CustomersController();

const customerRouter = Router();

customerRouter.get('/', customersController.index);
customerRouter.get('/:id', customersController.show);
customerRouter.post('/', customersController.create);
customerRouter.put('/:id', customersController.update);
customerRouter.delete('/:id', customersController.delete);

export default customerRouter;
