import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from './users.interfaces';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ default: 'User' })
  roles: string;

  @Column()
  status: UserStatus;
}
