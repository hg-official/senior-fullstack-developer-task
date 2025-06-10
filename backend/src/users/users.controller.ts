import {
  Controller,
  NotFoundException,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { EUserStatus } from './users.interfaces';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login/:username')
  async login(
    @Param('username') username: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<User> {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`The user - ${username} - not found`);
    }

    // if (user.status === UserStatus.DELETED) {
    //   throw new UnauthorizedException(`The user - ${username} - deleted`);
    // }

    res.cookie('auth_token', 'this_is_some_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return user;
  }
}
