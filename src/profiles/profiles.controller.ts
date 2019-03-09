import { Controller, UseInterceptors, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from '@nestjs/common';
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

    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id, @Body() profile: CreateProfileDto) {
        console.log(`PUT /profiles/${id} - ${profile}`);
        return this.profileService.update(id, profile);
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id) {
        console.log(`DELETE /profiles/${id}`);
        return this.profileService.delete(id);
    }
}
