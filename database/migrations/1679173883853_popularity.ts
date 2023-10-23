import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'popularity'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('from_user_id').unsigned().notNullable()
      table.foreign('from_user_id').references('users.id')
      table.integer('to_user_id').unsigned().notNullable()
      table.foreign('to_user_id').references('users.id')
      table.tinyint('points').notNullable()
      table.string('ip', 39).notNullable()
      table.timestamp('voted_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
