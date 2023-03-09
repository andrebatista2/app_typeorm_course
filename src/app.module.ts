import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'zrcQqid1kSXUM590EJ4Yo126',
      database: 'ads_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CourseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
