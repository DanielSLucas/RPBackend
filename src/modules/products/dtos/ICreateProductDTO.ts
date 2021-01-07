export default interface ICreateProductDTO {
  name: string;
  quantity: number;
  value: number;
  product_type: 'Bolos' | 'Arranjos' | 'Outros';
}
