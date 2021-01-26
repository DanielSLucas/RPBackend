import { Router } from 'express';

import CustomersController from '../controllers/CustomersController';

const customerController = new CustomersController();

const customerRouter = Router();

customerRouter.post('/', customerController.create);

export default customerRouter;
