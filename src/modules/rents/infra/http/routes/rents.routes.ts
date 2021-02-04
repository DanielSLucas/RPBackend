import { Router } from 'express';

import RentsController from '../controllers/RentsController';
// import AddressCustomerController from '../controllers/AddressCustomerController';

const rentsController = new RentsController();
// const adressCustomerController = new AddressCustomerController();

const rentsRouter = Router();

// rentsRouter.get('/', adressesController.index);
// rentsRouter.get('/:id', adressesController.show);
// rentsRouter.get('/customers/:id', adressCustomerController.show);
rentsRouter.post('/', rentsController.create);
// rentsRouter.put('/:id', adressesController.update);
// rentsRouter.delete('/:id', adressesController.delete);

export default rentsRouter;