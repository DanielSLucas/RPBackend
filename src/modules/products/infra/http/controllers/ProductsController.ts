import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductsService from '../../../services/ListProductsService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listProduct = container.resolve(ListProductsService);

      const products = await listProduct.execute();

      return response.json(products);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showProduct = container.resolve(ShowProductService);

      const product = await showProduct.execute(id);

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, quantity, value, product_type } = request.body;

      const createProduct = container.resolve(CreateProductService);

      const product = await createProduct.execute({
        name,
        quantity,
        value,
        product_type,
      });

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, quantity, value, product_type } = request.body;

      const createProduct = container.resolve(UpdateProductService);

      const product = await createProduct.execute({
        product_id: id,
        name,
        quantity,
        value,
        product_type,
      });

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleteProduct = container.resolve(DeleteProductService);

      await deleteProduct.execute(id);

      return response.json({ message: 'Product deleted!' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
