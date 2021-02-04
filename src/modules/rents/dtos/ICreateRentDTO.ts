export interface RentItem {
  product_id: string;
  quantity: number;
  value: number;
}

export default interface ICreateRentDTO {
  customer_id: string;
  address_id: string;
  rent_date: Date;
  payment_way: 'Dinheiro' | 'Transferência';
  payment_status: 'Pago' | 'Pendente' | 'Parcial';
  total_value: number;
}
