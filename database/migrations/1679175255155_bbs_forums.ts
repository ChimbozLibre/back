import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bbs_forums'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.integer('bbs_category_id').unsigned().notNullable()
      table.foreign('bbs_category_id').references('bbs_categories.id')
      table.string('name', 50).notNullable().unique()
      table.string('description').notNullable()
      table.integer('position').notNullable()
      table.boolean('is_private').notNullable().defaultTo(false)
      table.boolean('is_locked').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
