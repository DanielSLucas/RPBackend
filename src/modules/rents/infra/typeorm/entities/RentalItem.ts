import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Product from '../../../../products/infra/typeorm/entities/Product';
import Rent from './Rent';

@Entity('rental_items')
class RentalItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  rent_id: string;

  @ManyToOne(() => Rent)
  @JoinColumn({ name: 'rent_id' })
  rent: Rent;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default RentalItem;
