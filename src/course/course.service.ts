import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Tags } from './entities/tag.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly repository: Repository<Course>,

    @InjectRepository(Tags)
    private readonly tags: Repository<Tags>,
  ) { }

  async create(data: CreateCourseDto) {
    const tags = await Promise.all(
      data.tags.map((name) => this.preloadTagName(name)),
    );
    const course = this.repository.create({
      name: data.name,
      description: data.description,
      tags: tags,
    });
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

  private async preloadTagName(name: string): Promise<Tags> {
    const tag = await this.tags.findOne({ where: { name } });
    if (tag) {
      return tag;
    }

    return this.tags.create({
      name,
    });
  }
}
