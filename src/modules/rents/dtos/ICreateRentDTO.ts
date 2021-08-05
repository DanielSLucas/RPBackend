import { PaymentStatus, PaymentWays } from '../infra/typeorm/entities/Rent';

export interface RentItem {
  product_id: string;
  quantity: number;
  value: number;
}

export default interface ICreateRentDTO {
  customer_id: string;
  address_id: string;
  rent_date: Date;
  payment_way: PaymentWays;
  payment_status: PaymentStatus;
  total_value: number;
}
