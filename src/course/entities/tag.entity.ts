import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('db_tags')
export class Tags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json', { nullable: true })
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];
}
