import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserInterface } from './user.interface';
import { ProfileService } from 'src/profiles/profile.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly profileService: ProfileService,
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find({relations: ['profile']});
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id, {relations: ['profile']});
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.userRepository.find({
            relations: ['profile'],
            where: {username},
            take: 1,
        });
        return user[0];
    }

    async create(user: UserInterface) {
        return await this.userRepository.insert(user);
    }

    async update(id: number, user: UserInterface) {
        const actualUser = await this.findOne(id);
        const profile = await this.profileService.findOne(user.profileId);

        actualUser.username = user.username;
        actualUser.password = user.password;
        actualUser.profile = profile;
        actualUser.status = user.status;

        return this.userRepository.save(actualUser);
    }

    async delete(id: number) {
        return this.userRepository.delete(id);
    }
}
