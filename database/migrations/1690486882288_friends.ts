import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'friends'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('from_user_id').unsigned().notNullable()
      table.foreign('from_user_id').references('users.id')
      table.integer('to_user_id').unsigned().notNullable()
      table.foreign('to_user_id').references('users.id')
      table.primary(['from_user_id', 'to_user_id'])
      table.timestamp('invited_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('accepted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
