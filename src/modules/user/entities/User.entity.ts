import { Exclude } from 'class-transformer';
import { IsJWT } from 'class-validator';
import { Basket } from 'src/modules/basket/entities/basket.entity';
import { Favorite } from 'src/modules/favorites/entities/Favorites.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  @IsJWT()
  token: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user, { nullable: true })
  favorites: Favorite[];

  @OneToMany(() => Basket, (basket) => basket.user)
  user: User;
}
