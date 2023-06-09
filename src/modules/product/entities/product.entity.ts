import { Basket } from 'src/modules/basket/entities/basket.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Favorite } from 'src/modules/favorites/entities/Favorites.entity';
import { Merchant } from 'src/modules/merchant/entities/merchant.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Merchant, (merchant) => merchant.products, { eager: true })
  merchant: Merchant;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorite: Favorite;

  @OneToMany(() => Basket, (basket) => basket.product)
  basket: Basket;
}
