import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTagsIdToCoursesTagsTable1679503434849
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'tagsId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'fk_courses_tags_tags',
        columnNames: ['tagsId'],
        referencedTableName: 'db_tags',
        referencedColumnNames: ['id'],
        onUpdate: 'NO ACTION',
        onDelete: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('courses_tags', 'fk_courses_tags_tags');
    await queryRunner.dropColumn('courses_tags', 'tagsId');
  }
}
