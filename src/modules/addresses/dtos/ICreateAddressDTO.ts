export default interface ICreateAddressDTO {
  description: string;

  postal_code: string;

  city: string;

  neighborhood: string;

  street: string;

  number: string;

  address_type: 'Cobrança' | 'Salão' | 'Entrega' | 'Busca';
}
