import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserStatus } from 'src/enums/userStatus';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column('simple-array', { default: 'User' }) // ✅ multiple roles
  roles: string[];

  @Column({
    type: 'text',
    default: UserStatus.ENABLED,
  })
  status: UserStatus;
}
