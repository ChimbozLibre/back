import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/BBS/Category'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await Category.createMany([
      {
        name: 'Official',
        position: 0,
      },
      {
        name: 'General',
        position: 1,
      },
    ])
  }
}
