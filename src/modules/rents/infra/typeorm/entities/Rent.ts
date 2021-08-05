/* eslint-disable no-shadow */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Address from '../../../../addresses/infra/typeorm/entities/Address';
import Customer from '../../../../customers/infra/typeorm/entities/Customer';

export enum PaymentWays {
  CASH = 'CASH',
  TRANSFER = 'TRANSFER',
  PIX = 'PIX',
}

export enum PaymentStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
}

@Entity('rents')
class Rent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rent_date: Date;

  @Column()
  total_value: number;

  @Column()
  payment_way: PaymentWays;

  @Column()
  payment_status: PaymentStatus;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  address_id: string;

  @OneToOne(() => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rent;
