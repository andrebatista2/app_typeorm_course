import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Tags } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tags])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
