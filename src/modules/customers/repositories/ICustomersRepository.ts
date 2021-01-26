import Customer from '../infra/typeorm/entities/Customer';
import ICreateUserDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
  findByCFP(cpf: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  create(customerInfo: ICreateUserDTO): Promise<Customer>;
}
