import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ type: 'float', default: 0.0 })
  score: number;
}
