import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Request } from 'express';
import { User } from './users/users.entity';

interface RequestWithUser extends Request {
  user: User;
}

@Controller()
export class AppController {
  @UseGuards(AuthGuard)
  @Get('check-auth/')
  checkAuth(@Req() request: RequestWithUser) {
    console.log('ffff');
    return { ok: true };
  }

  @Get('home')
  getHome() {
    console.log('Get home');
  }

  @UseGuards(AuthGuard)
  @Get()
  getHello(@Req() request: RequestWithUser) {
    return {
      id: request.user.id,
      username: request.user.username,
      roles: request.user.roles,
      status: request.user.status,
    };
  }
}
