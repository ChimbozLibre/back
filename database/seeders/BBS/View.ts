import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import View from 'App/Models/BBS/View'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  public async run() {
    await View.createMany([
      {
        bbsTopicId: 1,
        userId: 1,
      },
      {
        bbsTopicId: 6,
        userId: 2,
      },
    ])
  }
}
