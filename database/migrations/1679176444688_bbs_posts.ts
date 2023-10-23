import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bbs_posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.integer('bbs_topic_id').unsigned().notNullable()
      table.foreign('bbs_topic_id').references('bbs_topics.id')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.text('message').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('censored_at', { useTz: true })
      table.timestamp('deleted_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
