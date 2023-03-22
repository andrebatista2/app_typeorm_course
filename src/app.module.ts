import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CourseModule } from './course/course.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CourseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'zrcQqid1kSXUM590EJ4Yo126',
      database: 'ads_db',
      entities: [__dirname + '/**/*.entity.js'],
      autoLoadEntities: false,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
