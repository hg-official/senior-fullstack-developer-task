import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ArrayMinSize, IsArray, IsString } from 'class-validator';
import { Status } from '../common/enums';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'json', default: '[]' })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  role: string[];

  @Column()
  status: Status;
}
