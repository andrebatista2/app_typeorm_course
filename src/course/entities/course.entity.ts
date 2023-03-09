import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Column('json', { nullable: true })
  tags: string[];

  @CreateDateColumn({
    default: 'now()',
  })
  created_at: Date;
}
