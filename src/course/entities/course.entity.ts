import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

  @JoinTable({ name: 'courses_tags' })
  @ManyToMany(() => Tags, (tag) => tag.courses, {
    cascade: true,
  })
  tags: Tags[];

  @CreateDateColumn({
    default: 'now()',
  })
  created_at: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }
}
