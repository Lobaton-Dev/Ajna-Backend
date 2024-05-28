import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1716379588566 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: "increment"
        },
        {
          name: "full_name",
          type: "varchar"
        },
        {
          name: "email",
          type: "varchar",
          isUnique: true
        },
        {
          name: "cpf",
          type: "varchar"
        },
        {
          name: "password",
          type: "varchar"
        },
        {
          name: "telephone",
          type: "varchar"
        },
        {
          name: "cep",
          type: "varchar"
        },
        {
          name: "city",
          type: "varchar"
        },
        {
          name: "state",
          type: "varchar"
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "CURRENT_TIMESTAMP"
        },
        {
          name: "updated_at",
          type: "timestamp",
          default: "CURRENT_TIMESTAMP"
        }
      ]
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }

}

