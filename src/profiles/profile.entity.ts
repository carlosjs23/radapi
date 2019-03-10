import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/users.entity';

export type ProfileServiceType = 'pppoe' | 'dhcp';

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

  @OneToMany(type => User, user => user.profile)
  users: User[];

  @Column({
    type: 'enum',
    enum: ['pppoe', 'dhcp'],
  })
  service: ProfileServiceType;
}
