import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
    constructor(private prisma : PrismaService){}

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const userExists = await this.prisma.user.findFirst({
        where: {
          OR: [
            { username: username },
            { email: email }
          ]
        }
      });
    if (userExists) {
      throw new HttpException( 
        'User with this email or username already exists',
        HttpStatus.BAD_REQUEST,
      )
    }
    return this.prisma.user.create({ data: { username, email, password } });
  }  
}
