import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { Request } from 'express';
import { User } from './users/users.entity';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './guards/roles.decorator';

interface RequestWithUser extends Request {
  user: User;
}

@Controller()
export class AppController {
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/home')
  @Roles(['Admin', 'User', 'Editor'])
  getHome() {
    console.log('Get home');
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin'])
  @Get('/admin')
  getAdmin() {
    console.log('Get admin');
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(['Admin', 'Editor'])
  @Get('/editor')
  getEditor() {
    console.log('Get Editor');
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
