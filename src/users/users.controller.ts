import { Controller, Get, ParseIntPipe, Param, UseInterceptors, Post, Body, Put, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async findAll(): Promise<User[]> {
        console.log(`GET /users`);
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(
        @Param('id', new ParseIntPipe())
        id,
    ) {
        console.log(`GET /users/${id}`);
        return this.userService.findOne(id);
    }

    @Post()
    async create(@Body() user: CreateUserDto) {
        console.log(`POST /users - ${user}`);
        return this.userService.create(user);
    }

    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id, @Body() user: CreateUserDto) {
        console.log(`PUT /users/${id} - ${user}`);
        return this.userService.update(id, user);
    }

    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id) {
        console.log(`DELETE /users/${id}`);
        return this.userService.delete(id);
    }
}
