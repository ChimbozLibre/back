import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'group_members'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('group_id').unsigned().notNullable()
      table.foreign('group_id').references('groups.id')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.primary(['group_id', 'user_id'])
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('accepted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
