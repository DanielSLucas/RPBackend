import { Router } from 'express';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);
productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.show);
productsRouter.post('/', productsController.create);
productsRouter.put('/:id', productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
