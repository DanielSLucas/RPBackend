import { Router } from 'express';

import AddressesController from '../controllers/AddressesController';

const adressesController = new AddressesController();

const adressesRouter = Router();

// adressesRouter.get('/', customersController.index);
// adressesRouter.get('/:id', customersController.show);
adressesRouter.post('/', adressesController.create);
// adressesRouter.put('/:id', customersController.update);
// adressesRouter.delete('/:id', customersController.delete);

export default adressesRouter;
