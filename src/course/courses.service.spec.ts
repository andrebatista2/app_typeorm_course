import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from './course.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Tags } from './entities/tag.entity';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const mockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CourseService;
  let courseRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Course), useValue: mockRepository() },
        { provide: getRepositoryToken(Tags), useValue: mockRepository() },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('To Courses...', () => {
    describe('Should return the Course by ID', () => {
      it('Should return an Course object', async () => {
        const courseId = '1';
        const expectCourse = {};

        courseRepository.findOne.mockReturnValue(expectCourse);
        const course = await service.findOne(courseId);
        expect(course).toEqual(expectCourse);
      });
    });

    it('Must throw an NotFoundException', async () => {
      try {
        const courseId = '1';
        courseRepository.findOne.mockReturnValue(undefined);
        await service.findOne(courseId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
