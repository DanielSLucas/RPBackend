/* eslint-disable no-shadow */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AddressTypes {
  PERSONAL = 'PERSONAL',
  PARTYROOM = 'PARTYROOM',
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
}
@Entity('addresses')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column({ type: 'enum', enum: AddressTypes })
  address_type: AddressTypes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
