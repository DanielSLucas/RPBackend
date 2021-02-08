import { inject, injectable } from 'tsyringe';
import RentalItem from '../../rents/infra/typeorm/entities/RentalItem';
import IRentalItemsRepository from '../../rents/repositories/IRentalItemsRepository';
import IRentsRepository from '../../rents/repositories/IRentsRepository';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListAvailableProductsInASpecificDateService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('RentsRepository')
    private rentsRepository: IRentsRepository,

    @inject('RentalItemsRepository')
    private rentalItemsRepository: IRentalItemsRepository,
  ) {}

  public async execute(date: Date): Promise<Product[]> {
    let products: Product[];

    const allProducts = await this.productsRepository.findAll();

    const rentsInThisDay = await this.rentsRepository.findByDate(date);

    if (rentsInThisDay.length === 0) {
      products = allProducts;
      return products;
    }

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

    const consolidatedRentedItemsInThisDayIDs = consolidatedRentedItemsInThisDay.map(
      item => item.product_id,
    );

    const rentedProducts = await this.productsRepository.findByIds(
      consolidatedRentedItemsInThisDayIDs,
    );

    const rentedItemAvailableQuantity = consolidatedRentedItemsInThisDay.map(
      rentedItem => {
        let availableQuantity = 0;

        rentedProducts.forEach(product => {
          if (rentedItem.product_id === product.id) {
            availableQuantity = product.quantity - rentedItem.quantity;
          }
        });

        return {
          product_id: rentedItem.product_id,
          availableQuantity,
        };
      },
    );

    products = allProducts.map(product => {
      const retunedProduct = product;

      rentedItemAvailableQuantity.forEach(item => {
        if (retunedProduct.id === item.product_id) {
          retunedProduct.quantity = item.availableQuantity;
        }
      });

      return retunedProduct;
    });

    return products;
  }
}

export default ListAvailableProductsInASpecificDateService;
