import { container } from 'tsyringe';
import '../../modules/users/providers';

import IProductsRepository from '../../modules/products/repositories/IProductsRepository';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository';

import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';

import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '../../modules/customers/repositories/ICustomersRepository';

import AddressesRepository from '../../modules/addresses/infra/typeorm/repositories/AddressesRepository';
import IAddressesRepository from '../../modules/addresses/repositories/IAddressesRepository';

import AddressCustomersRepository from '../../modules/addresses/infra/typeorm/repositories/AddressCustomersRepository';
import IAddressCustomersRepository from '../../modules/addresses/repositories/IAddressCustomersRepository';

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

container.registerSingleton<IAddressesRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IAddressCustomersRepository>(
  'AddressCustomersRepository',
  AddressCustomersRepository,
);
