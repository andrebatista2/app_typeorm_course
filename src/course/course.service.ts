import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,
  ) {}

  async create(data: CreateCourseDto) {
    const course = this.repository.create(data);
    return this.repository.save(course);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    const courses = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!courses) {
      throw new NotFoundException('Course not found with provided ID');
    }

    return courses;
  }

  async update(id: string, data: UpdateCourseDto) {
    const course = await this.repository.preload({
      id,
      ...data,
    });

    if (!course) {
      throw new NotFoundException('Provided ID was not found in system');
    }

    return this.repository.save(course);
  }

  async remove(id: string) {
    const course = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException('Provided ID was not found in system');
    }

    return this.repository.remove(course);
  }
}
