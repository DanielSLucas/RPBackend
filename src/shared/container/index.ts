import { container } from 'tsyringe';
import './providers';

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

import RentsRepository from '../../modules/rents/infra/typeorm/repositories/RentsRepository';
import IRentsRepository from '../../modules/rents/repositories/IRentsRepository';

import RentalItemsRepository from '../../modules/rents/infra/typeorm/repositories/RentalItemsRepository';
import IRentalItemsRepository from '../../modules/rents/repositories/IRentalItemsRepository';

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

container.registerSingleton<IRentsRepository>(
  'RentsRepository',
  RentsRepository,
);

container.registerSingleton<IRentalItemsRepository>(
  'RentalItemsRepository',
  RentalItemsRepository,
);
