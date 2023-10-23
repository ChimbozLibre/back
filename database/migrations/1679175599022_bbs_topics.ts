import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bbs_topics'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.integer('bbs_forum_id').unsigned().notNullable()
      table.foreign('bbs_forum_id').references('bbs_forums.id')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.string('name', 50).notNullable()
      table.enum('type', ['ANNOUNCE', 'POST-IT'])
      table.integer('views').unsigned().notNullable().defaultTo(0)
      table.boolean('is_locked').notNullable().defaultTo(false)
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
