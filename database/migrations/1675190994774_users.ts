import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().notNullable().primary()
      table.string('email', 255).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('remember_me_token').nullable()
      table.string('username', 20).notNullable().unique()
      table.integer('experience').unsigned().notNullable().defaultTo(0)
      table.string('avatar_design').notNullable().defaultTo('r;0;318;606;792;868;938')
      table
        .enum('avatar_mood', [
          'HAPPY',
          'LOL',
          'SAD',
          'CRYING',
          'ANGRY',
          'BLINK',
          'KORBAK',
          'TONGUE',
          'LOVE',
          'SURPRISED',
          'SLEEPY',
          'EMBARASSED',
          'NEKO',
          'PERSEVERE',
          'EYES_LEFT',
          'CUTE',
          'CHAMPION',
          'SHARK',
          'SHAMEFUL',
          'OOPS',
          'PARANO',
          'CRAZY',
          'FEARFUL',
          'SMIRK',
        ])
        .nullable()
      table.enum('gender', ['MALE', 'FEMALE']).nullable()
      table.string('motto', 120)
      table.string('website', 120)
      table.string('interest1', 50)
      table.string('interest2', 50)
      table.string('interest3', 50)
      table.string('interest4', 50)
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
