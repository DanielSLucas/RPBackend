import { Router } from 'express';

import AddressesController from '../controllers/AddressesController';
import AddressCustomerController from '../controllers/AddressCustomerController';

const adressesController = new AddressesController();
const adressCustomerController = new AddressCustomerController();

const adressesRouter = Router();

adressesRouter.get('/', adressesController.index);
adressesRouter.get('/:id', adressesController.show);
adressesRouter.get('/customers/:id', adressCustomerController.show);
adressesRouter.post('/', adressesController.create);
adressesRouter.put('/:id', adressesController.update);
adressesRouter.delete('/:id', adressesController.delete);

export default adressesRouter;
