import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'bacteria_games'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('player1_id').unsigned().notNullable()
      table.foreign('player1_id').references('users.id')
      table.string('player1_ip', 39).notNullable()
      table.integer('player2_id').unsigned().notNullable()
      table.foreign('player2_id').references('users.id')
      table.string('player2_ip', 39).notNullable()
      table.specificType('map', 'char(64)').notNullable()
      table.enum('start', ['PLAYER1', 'PLAYER2']).notNullable()
      table.enum('winner', ['PLAYER1', 'PLAYER2']).nullable()
      table.json('game')
      table.timestamp('played_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
