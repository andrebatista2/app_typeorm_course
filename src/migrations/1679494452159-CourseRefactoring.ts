import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRefactoring1679494452159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "db_courses" RENAME COLUMN "name" TO "course"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "db_courses" RENAME COLUMN "course" TO "name"',
    );
  }
}
