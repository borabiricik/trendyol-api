import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/User.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Product, (product) => product.basket)
  product: Product;

  @Column({ nullable: false, default: 1 })
  quantity: number;
}
