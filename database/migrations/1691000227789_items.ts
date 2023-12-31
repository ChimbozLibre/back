import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table
        .enum('rank', ['COMMON', 'BASIC', 'RARE', 'UNIQUE', 'LEGENDARY', 'DIVINE', 'RESERVED'])
        .defaultTo('RESERVED')
      table.enum('type', [
        'HAT',
        'BODY',
        'SHOE',
        'ITEM0',
        'ITEM1',
        'ITEM2',
        'FURNITURE',
        'AVATAR',
        'TOOL',
        'RESOURCE',
        'PET',
      ])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
