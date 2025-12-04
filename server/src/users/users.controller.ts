import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './dto/create-user.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod.validation.pipe';
import type { ListUsersQueryDto } from './dto/list-users-query-dto';
import { listUsersQuerySchema } from './dto/list-users-query-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get()
  findAll(
    @Query(new ZodValidationPipe(listUsersQuerySchema))
    query: ListUsersQueryDto,
  ) {
    return this.usersService.findAll(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
