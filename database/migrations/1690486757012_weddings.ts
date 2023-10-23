import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'weddings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.integer('first_married_user_id').unsigned().notNullable()
      table.foreign('first_married_user_id').references('users.id')
      table.integer('second_married_user_id').unsigned().notNullable()
      table.foreign('second_married_user_id').references('users.id')
      table.integer('first_witness_user_id').unsigned().notNullable()
      table.foreign('first_witness_user_id').references('users.id')
      table.integer('second_witness_user_id').unsigned().notNullable()
      table.foreign('second_witness_user_id').references('users.id')
      table.integer('divorced_by_user_id').unsigned()
      table.foreign('divorced_by_user_id').references('users.id')
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('divorced_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
