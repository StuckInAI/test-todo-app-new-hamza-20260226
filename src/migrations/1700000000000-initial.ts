import { MigrationInterface, QueryRunner } from 'typeorm'

export class Initial1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \"todo\" (
        \"id\" INTEGER PRIMARY KEY AUTOINCREMENT,
        \"task\" TEXT NOT NULL,
        \"category\" TEXT NOT NULL DEFAULT 'Health & Fitness',
        \"completed\" BOOLEAN NOT NULL DEFAULT 0,
        \"createdAt\" DATETIME NOT NULL DEFAULT (datetime('now')),
        \"updatedAt\" DATETIME NOT NULL DEFAULT (datetime('now'))
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \"todo\"`)
  }
}