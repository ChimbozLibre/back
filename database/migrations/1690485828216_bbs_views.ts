import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bbs_views'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('bbs_topic_id').unsigned().notNullable()
      table.foreign('bbs_topic_id').references('bbs_topics.id')
      table.integer('user_id').unsigned().notNullable()
      table.foreign('user_id').references('users.id')
      table.primary(['bbs_topic_id', 'user_id'])
      table.timestamp('viewed_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
