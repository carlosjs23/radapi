import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Profile } from '../profiles/profile.entity';

export type UserStatusType = 'active' | 'suspended' | 'canceled';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    registerDate: string;

    @OneToOne(type => Profile)
    @JoinColumn()
    profile: Profile;

    @Column({
        type: 'enum',
        enum: ['active', 'suspended', 'canceled'],
        default: 'active',
    })
    status: UserStatusType;
}
