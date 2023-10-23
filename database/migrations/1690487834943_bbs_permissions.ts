import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bbs_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('group_id').unsigned().notNullable()
      table.foreign('group_id').references('groups.id')
      table.integer('bbs_forum_id').unsigned().notNullable()
      table.foreign('bbs_forum_id').references('bbs_forums.id')
      table.primary(['group_id', 'bbs_forum_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
