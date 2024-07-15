import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class MigrationFirst1721013364589 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'categories',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: 'name',
					type: 'varchar',
					length: '100',
				},
				{
					name: 'created_at',
					type: 'timestamp with time zone',
					default: 'now()',
				},
				{
					name: 'updated_at',
					type: 'timestamp with time zone',
					default: 'now()',
				},
			],
		}));

		await queryRunner.createTable(new Table({
			name: 'expenses',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: 'category_id',
					type: 'uuid',
					isNullable: true,
				},
				{
					name: 'observation',
					type: 'varchar',
					length: '250',
					isNullable: true,
				},
				{
					name: 'amount',
					type: 'decimal',
				},
				{
					name: 'essential',
					type: 'boolean',
				},
				{
					name: 'recurrent',
					type: 'boolean',
				},
				{
					name: 'created_at',
					type: 'timestamp with time zone',
					default: 'now()',
				},
				{
					name: 'updated_at',
					type: 'timestamp with time zone',
					default: 'now()',
				},
			],
		}));

		await queryRunner.createForeignKey(
			'expenses',
			new TableForeignKey({
				name: 'CategoryIdentifier',
				columnNames: ['category_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'categories',
				onDelete: 'SET NULL'
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('expenses');
		await queryRunner.dropTable('categories');
	}
}
