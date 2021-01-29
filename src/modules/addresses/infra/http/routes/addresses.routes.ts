import { Router } from 'express';

import AddressesController from '../controllers/AddressesController';

const adressesController = new AddressesController();

const adressesRouter = Router();

adressesRouter.get('/', adressesController.index);
adressesRouter.get('/:id', adressesController.show);
adressesRouter.post('/', adressesController.create);
adressesRouter.put('/:id', adressesController.update);
adressesRouter.delete('/:id', adressesController.delete);

export default adressesRouter;
