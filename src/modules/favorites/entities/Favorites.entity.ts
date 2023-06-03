import { Product } from 'src/modules/product/entities/product.entity';
import { User } from 'src/modules/user/entities/User.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;
}
