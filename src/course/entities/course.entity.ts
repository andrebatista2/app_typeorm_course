import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

import { Tags } from './tag.entity';

@Entity('db_courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: '20',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '100',
  })
  description: string;

  @JoinTable()
  @ManyToMany(() => Tags, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Tags[];

  @CreateDateColumn({
    default: 'now()',
  })
  created_at: Date;
}
