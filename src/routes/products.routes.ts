import { Router } from 'express';

const productsRouter = Router();

productsRouter.get('/', (request, response) => {
  return response.send('Products');
});

export default productsRouter;
