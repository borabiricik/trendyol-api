import { Product } from 'src/modules/product/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
