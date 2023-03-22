import { AppController } from './app.controller';
import { CourseModule } from './course/course.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CourseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
