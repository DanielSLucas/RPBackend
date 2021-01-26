import { Router } from 'express';
import authRole from '../../../../../shared/infra/http/middlewares/authRole';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.use(authRole('ADM'));
usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.index);
usersRouter.get('/:id', usersController.show);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
