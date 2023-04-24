import { Category } from 'src/modules/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column('decimal', { nullable: false })
  price: number;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
