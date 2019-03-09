import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  addressPool: string;

  @Column()
  addressList: string;

  @Column({default: 0})
  accessPeriod: number;
}
