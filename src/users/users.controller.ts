import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('username') username: string,
    @Res() res : Response,
  ) {
    const user = await this.userService.createUser(email, password, username);
    if(user.email === email || user.username === username) {
        return res.status(HttpStatus.CONFLICT).json({
            message: 'Email or username already exists.',
          });
    }
    return res.status(HttpStatus.CREATED).json({ user });
}
}
