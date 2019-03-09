import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { ProfileInterface } from './profile.interface';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) { }

    async findAll(): Promise<Profile[]> {
        return await this.profileRepository.find();
    }

    async findOne(id: number): Promise<Profile> {
        return await this.profileRepository.findOne(id);
    }

    async create(profile: ProfileInterface) {
        return await this.profileRepository.insert(profile);
    }
}
