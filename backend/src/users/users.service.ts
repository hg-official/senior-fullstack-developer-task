import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
  getRoles(username: string): Promise<string | undefined> {
    return this.usersRepository
      .findOneBy({ username })
      .then((user) => user?.roles);
  }
}
