import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { UsersService } from '../users/users.service';

const matchRoles = (allowedRoles: string[], userRoles: string[]): boolean => {
  return allowedRoles.some((role) => userRoles.includes(role));
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const username = request.headers.token;

    const userRoles = await this.usersService.getRoles(username);
    // console.log(request.user);

    if (!userRoles) {
      return false;
    }

    return matchRoles(roles, JSON.parse(userRoles));
  }
}
