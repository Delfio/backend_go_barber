/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AlterProviderFiledsToProviderID1590343850907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('users', 'id', new TableColumn({
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    }));
    await queryRunner.changeColumn('appointments', 'id', new TableColumn({
      name: 'id',
      type: 'uuid',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    }));
    await queryRunner.dropColumn('appointments', 'provider');
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true,
    }));

    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn('users', 'id', new TableColumn({
      name: 'id',
      type: 'varchar',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    }));

    await queryRunner.changeColumn('appointments', 'id', new TableColumn({
      name: 'id',
      type: 'varchar',
      isPrimary: true,
      generationStrategy: 'uuid',
      default: 'uuid_generate_v4()',
    }));

    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
      isNullable: false,
    }));
  }
}
