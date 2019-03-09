import { Controller, UseInterceptors, Get, Param, ParseIntPipe, Post, Body } from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './create-profile.dto';

@Controller('profiles')
@UseInterceptors(TransformInterceptor)
export class ProfilesController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    async findAll(): Promise<Profile[]> {
        console.log(`GET /profiles`);
        return this.profileService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe()) id,
    ) {
        console.log(`GET /profiles/${id}`);
        return this.profileService.findOne(id);
    }

    @Post()
    async create(@Body() createProfileDto: CreateProfileDto) {
        console.log(`POST /profiles - ${createProfileDto}`);
        return this.profileService.create(createProfileDto);
    }
}
