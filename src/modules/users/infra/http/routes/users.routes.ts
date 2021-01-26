import { Router } from 'express';
import authRole from '../../../../../shared/infra/http/middlewares/authRole';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.use(authRole('ADM'));
usersRouter.get('/', usersController.index);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
