import { Product } from 'src/modules/product/entities/product.entity';
import { SubCategory } from 'src/modules/sub-category/entities/sub-category.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];

  @OneToMany(() => SubCategory, (sub_category) => sub_category.category)
  sub_categories: SubCategory[];
}
