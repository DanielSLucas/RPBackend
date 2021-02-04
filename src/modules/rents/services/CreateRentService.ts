/* eslint-disable no-plusplus */
import { inject, injectable } from 'tsyringe';
import { isBefore, parseISO } from 'date-fns';
import AppError from '../../../shared/errors/AppError';

import Rent from '../infra/typeorm/entities/Rent';

import IRentsRepository from '../repositories/IRentsRepository';
import IRentalItemsRepository from '../repositories/IRentalItemsRepository';
import ICustomersRepository from '../../customers/repositories/ICustomersRepository';
import IProductsRepository from '../../products/repositories/IProductsRepository';
import IAddressesRepository from '../../addresses/repositories/IAddressesRepository';

import { RentItem } from '../dtos/ICreateRentDTO';
import RentalItem from '../infra/typeorm/entities/RentalItem';

interface Request {
  customer_id: string;
  address_id: string;
  rent_date: Date;
  payment_way: 'Dinheiro' | 'Transferência';
  payment_status: 'Pago' | 'Pendente' | 'Parcial';
  total_value: number;
  rental_items: RentItem[];
}

@injectable()
class CreateAddressService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,

    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('RentalItemsRepository')
    private rentalItemsRepository: IRentalItemsRepository,
  ) {}

  public async execute({
    customer_id,
    address_id,
    rent_date,
    rental_items,
    payment_status,
    payment_way,
    total_value,
  }: Request): Promise<Rent> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Customer doesn't exist.", 400);
    }

    const addressExists = await this.addressesRepository.findById(address_id);

    if (!addressExists) {
      throw new AppError("Address doesn't exist.", 400);
    }

    // const parsedDate = parseISO(rent_date);

    if (isBefore(rent_date, Date.now())) {
      throw new AppError("You can't create a rent in a past date");
    }

    const productsIDs = rental_items.map(item => item.product_id);

    const rentedProducts = await this.productsRepository.findByIds(productsIDs);

    for (let i = 0; i < rental_items.length; i++) {
      const product = rentedProducts.find(item => {
        return item.id === rental_items[i].product_id;
      });
      if (product) {
        if (rental_items[i].quantity > product.quantity) {
          throw new AppError('Not enough products', 400);
        }
      }
    }

    const rentsInThisDay = await this.rentsRepository.findByDate(rent_date);

    if (rentsInThisDay.length !== 0) {
      const rentsInThisDayIDs = rentsInThisDay.map(rent => rent.id);

      const rentedItemsInThisDay = await this.rentalItemsRepository.findByRents(
        rentsInThisDayIDs,
      );

      const consolidatedRentedItemsInThisDay: RentalItem[] = [];

      rentedItemsInThisDay.forEach(rentedItem => {
        const itemIndex = consolidatedRentedItemsInThisDay.findIndex(
          item => item.product_id === rentedItem.product_id,
        );

        if (itemIndex !== -1) {
          consolidatedRentedItemsInThisDay[itemIndex].quantity +=
            rentedItem.quantity;

          consolidatedRentedItemsInThisDay[itemIndex].value += rentedItem.value;
        } else {
          consolidatedRentedItemsInThisDay.push(rentedItem);
        }
      });

      consolidatedRentedItemsInThisDay.forEach(consolidatedRentedItem => {
        rental_items.forEach(rentalItem => {
          if (consolidatedRentedItem.product_id === rentalItem.product_id) {
            const product = rentedProducts.find(
              item => item.id === consolidatedRentedItem.product_id,
            );

            if (product) {
              // A quantidade alugada nessse dia é igual a disponível em estoque?
              if (consolidatedRentedItem.quantity === product.quantity) {
                throw new AppError('All units of this product are rented', 400);
              }

              const quantityAvailableInStock =
                product.quantity - consolidatedRentedItem.quantity;

              if (rentalItem.quantity > quantityAvailableInStock) {
                throw new AppError('Not enough products', 400);
              }
            }
          }
        });
      });
    }

    const rent = await this.rentsRepository.create({
      customer_id,
      address_id,
      rent_date,
      payment_way,
      payment_status,
      total_value,
    });

    await this.rentalItemsRepository.create(rental_items, rent.id);

    return rent;
  }
}

export default CreateAddressService;
