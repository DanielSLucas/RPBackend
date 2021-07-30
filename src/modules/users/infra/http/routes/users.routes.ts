import { Router } from 'express';
import authRole from '../../../../../shared/infra/http/middlewares/authRole';
import { UsersRoles } from '../../typeorm/entities/User';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.use(authRole(UsersRoles.ADM));
usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.index);
usersRouter.get('/:id', usersController.show);
usersRouter.put('/:id', usersController.update);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
