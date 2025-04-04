import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { authGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(authGuard)
  create(@Body() createUserDto: CreateUserDto) {
    Logger.log(`TRYING TO CREATE USER ${createUserDto.username}`)
    return this.usersService.create(createUserDto);
  }
}
