import Customer from '../infra/typeorm/entities/Customer';
import ICreateUserDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomersRepository {
  findByCFP(cpf: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  findAll(): Promise<Customer[]>;
  create(customerInfo: ICreateUserDTO): Promise<Customer>;
  update(customer: Customer, customerInfo: ICreateUserDTO): Promise<Customer>;
  delete(customer: Customer): Promise<void>;
}
