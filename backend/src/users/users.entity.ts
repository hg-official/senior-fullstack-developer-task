import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'Admin',
  REGULAR = 'Regular',
  EDITOR = 'Editor',
}

export enum UserStatus {
  ENABLED = 'Enabled',
  DISABLED = 'Disabled',
  DELETED = 'Deleted',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text', default: UserRole.REGULAR })
  role: UserRole;

  @Column({ type: 'text', default: UserStatus.ENABLED })
  status: UserStatus;
}
