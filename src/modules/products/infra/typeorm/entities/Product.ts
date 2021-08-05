/* eslint-disable no-shadow */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProductTypes {
  CAKES = 'CAKES',
  OTHERS = 'OTHERS',
  ARRANGEMENTS = 'ARRANGEMENTS',
}

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  value: number;

  @Column({ type: 'enum', enum: ProductTypes })
  product_type: ProductTypes;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
