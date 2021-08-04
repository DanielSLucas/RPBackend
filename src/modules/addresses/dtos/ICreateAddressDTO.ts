import { AddressTypes } from '../infra/typeorm/entities/Address';

export default interface ICreateAddressDTO {
  description: string;

  postal_code: string;

  city: string;

  neighborhood: string;

  street: string;

  number: string;

  address_type: AddressTypes;
}
