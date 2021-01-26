import { container } from 'tsyringe';
import '../../modules/users/providers';

import IProductsRepository from '../../modules/products/repositories/IProductsRepository';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository';

import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRespository';

import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '../../modules/customers/repositories/ICustomersRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
