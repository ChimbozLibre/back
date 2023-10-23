import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'groups'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.string('name', 45).notNullable().unique()
      table.integer('owner_id').unsigned().notNullable()
      table.foreign('owner_id').references('users.id')
      table.enum('status', ['OPEN', 'CLOSED', 'ON_DEMAND'])
      table.enum('type', [
        'GROUP',
        'KLUB',
        'CLAN',
        'EKIP',
        'SKWAT',
        'GUILD',
        'ALLIANCE',
        'EMPIRE',
        'SEKT',
        'SKOOL',
        'HORD',
        'MEUTE',
        'GANG',
        'TRIAD',
      ])
      table.text('description')
      table.string('motto', 100)
      table.string('arms', 45)
      table.string('location', 45)
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.boolean('is_official').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
