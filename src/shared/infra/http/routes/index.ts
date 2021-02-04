import { Router } from 'express';

import adressesRouter from '../../../../modules/addresses/infra/http/routes/addresses.routes';
import customerRouter from '../../../../modules/customers/infra/http/routes/customers.routes';
import productsRouter from '../../../../modules/products/infra/http/routes/products.routes';
import rentsRouter from '../../../../modules/rents/infra/http/routes/rents.routes';
import sessionRouter from '../../../../modules/users/infra/http/routes/session.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionRouter);

routes.use(ensureAuthenticated);

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/customers', customerRouter);
routes.use('/addresses', adressesRouter);
routes.use('/rents', rentsRouter);

export default routes;
