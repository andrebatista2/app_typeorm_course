import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Course } from './course.entity';

@Entity('db_tags')
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { nullable: true })
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }
}
