import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  picture: string;

  @Column()
  score: number;
}
