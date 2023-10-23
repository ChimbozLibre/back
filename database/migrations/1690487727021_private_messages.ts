import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'private_messages'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.integer('from_user_id').unsigned().notNullable()
      table.foreign('from_user_id').references('users.id')
      table.integer('to_user_id').unsigned().notNullable()
      table.foreign('to_user_id').references('users.id')
      table.text('message').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('seen_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
