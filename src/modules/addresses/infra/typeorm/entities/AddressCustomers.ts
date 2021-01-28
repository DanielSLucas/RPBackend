import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import Customer from '../../../../customers/infra/typeorm/entities/Customer';
import Address from './Address';

@Entity('address_customer')
class AddressCustomer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Um endereço pode pertencer a apenas um cliente - OneToOne
  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  // Um cliente pode ter vários endereços - ManyToOne
  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AddressCustomer;
